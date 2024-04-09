from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
import requests

from api.models import Consulta, Usuario
from datetime import datetime
import json
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv('.env'))

@api_view(['GET'])
def agenda(request):
    """
    Pega a agenda do paciente. Retorna todas as consultas marcadas para ele após a data de hoje.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")

    payload = {'user_id': data['user_id']}
    resp = requests.get('http://127.0.0.1:8000/api/medico/consulta_paciente', params=payload)
    consultas_medico = []
    if(resp.status_code == 200):
        consultas_medico = resp.json()

    resp = requests.get('http://127.0.0.1:8000/api/nutricionista/consulta_paciente', params=payload)
    consultas_nutricionista = []
    if(resp.status_code == 200):
        consultas_nutricionista = resp.json()

    resp = requests.get('http://127.0.0.1:8000/api/preparador/consulta_paciente', params=payload)
    consultas_preparador = []
    if(resp.status_code == 200):
        consultas_preparador = resp.json()

    consultas = consultas_medico
    consultas.extend(consultas_nutricionista)
    consultas.extend(consultas_preparador)

    consultas.sort(key=lambda x: x['horario'])

    return Response(consultas)

@api_view(['POST'])
def createAppointment(request):
    """
    Cria uma nova consulta.

    Query parameters:
        user_id: ID usuário do paciente
        professional_id: ID usuário do profissional
        professional_type: Tipo do profissional
        horario: Data e hora da consulta
        duracao: Duracao em minutos
    """

    body = json.loads(request.body.decode('utf-8'))

    try: 
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    consultaProfissional = Consulta.objects.filter(
        profissional_id=body['professional_id'],
        horario = body['horario']
    ).exclude(
        status=1 # consulta cancelada
    ).count()

    consultaPaciente = Consulta.objects.filter(
        paciente=usuario,
        horario = body['horario']
    ).exclude(
        status=1 # consulta cancelada
    ).count()

    if (consultaProfissional != 0 or consultaPaciente != 0):
        return Response("Horário indisponível para consulta", 400)

    # TODO: Chamar método que define valores
    valor = 0
    if(body['professional_type'] == 1):
        valor = 100
    if(body['professional_type'] == 2):
        valor = 90
    if(body['professional_type'] == 3):
        valor = 120

    url = "https://labengsoft.azurewebsites.net/api/Tarifagem?code="+os.environ.get('TARIFA_URL_CODE')

    payload = json.dumps({
        "valorBruto": valor
    })
    headers = {
        'Content-Type': 'application/json'
    }

    resp = requests.request("POST", url, headers=headers, data=payload)
    if(resp.status_code == 200):
        resp_data = resp.json()
        tarifa = resp_data["tarifa"]

        consulta = Consulta.objects.create(
            paciente=usuario,
            profissional_id=body['professional_id'],
            horario = body['horario'],
            duracao_em_minutos = body['duracao'],
            valor=valor,
            tarifa=tarifa,
            status=4 # consulta pendente
        )

        return Response("Consulta criada")

    return Response("Erro ao criar consulta", 400)

@api_view(['POST'])
def cancelAppointment(request):
    """
    Cancela uma consulta.

    Query parameters:
        user_id: ID usuário do paciente
        appointment_id: ID da consulta
    """

    body = json.loads(request.body.decode('utf-8'))

    try: 
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    consulta = Consulta.objects.get(
        id=body['appointment_id'],
        paciente=usuario
    )

    if(consulta):
        if(consulta.status in [0, 4]):
            consulta.status = 1
            consulta.save()
            return Response("Consulta atualizada")
        else:
            return Response("Consulta indisponível para cancelamento", 400)
    else:
        return Response("Erro ao atualizar consulta", 400)

@api_view(['POST'])
def payAppointment(request):
    """
    Marca como pago uma consulta.

    Query parameters:
        user_id: ID usuário do paciente
        appointment_id: ID da consulta
        card_number: Número do cartão
        professional_type: tipo de profissional
    """

    body = json.loads(request.body.decode('utf-8'))

    try: 
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    consulta = Consulta.objects.get(
        id=body['appointment_id'],
        paciente=usuario
    )

    professional_type = "medico"
    if(body['professional_type'] == 2):
        professional_type = "nutricionista"
    elif(body['professional_type'] == 3):
        professional_type = "preparador"

    if(consulta):
        if(consulta.status == 4):
            payload = {'user_id': consulta.profissional_id}
            resp = requests.get('http://127.0.0.1:8000/api/'+professional_type+'/informacao_bancaria', params=payload)
            if(resp.status_code == 200):
                professional_bank_account = resp.json()

                url = "https://labengsoft.azurewebsites.net/api/Pagamento?code="+os.environ.get('PAGAMENTO_URL_CODE')

                payload = json.dumps({
                    "valorPagamento": consulta.valor + consulta.tarifa,
                    "numeroCartao": body['card_number'],
                    "numeroContaRecebedor": professional_bank_account
                })
                headers = {
                    'Content-Type': 'application/json'
                }

                resp = requests.request("POST", url, headers=headers, data=payload)
                if(resp.status_code == 200):
                    resp_data = resp.json()
                    if(resp_data["pagamentoBemSucedido"]):
                        consulta.status = 0
                        consulta.save()
                        return Response("Consulta atualizada")
            return Response("Erro no processamento do pagamento pagamento", 400)
        else:
            return Response("Consulta indisponível para pagamento", 400)
    else:
        return Response("Erro ao atualizar consulta", 400)