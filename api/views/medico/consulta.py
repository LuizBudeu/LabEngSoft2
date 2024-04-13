from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.exceptions import ParseError
from rest_framework.parsers import JSONParser
import json
import requests

from api.models import Consulta, Usuario, Medico, RelatorioMedico


@api_view(['POST'])
def registrar_formulario(request: HttpRequest, consulta_id) -> Response:
    """
    Cria um novo objeto de Relatório do preparador físico.

    Body da requisição:
        treino_id, altura, massa, nivel_de_atividade_fisica,
        porcentagem_de_gordura, porcentage_de_musculo, metabolismo_basal,
        gasto_calorico, treino_fisico

    """

    body = json.loads(request.body.decode('utf-8'))

    try:
        consulta = Consulta.objects.get(id=consulta_id)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={body['user_id']} não encontrada")

    try:
        relatorio = RelatorioMedico(
            consulta=consulta,
            massa=body["massa"],
            altura=body["altura"],
            nivel_de_acucar_no_sangue=body["nivel_de_acucar_no_sangue"],
            gordura_no_figado=body["gordura_no_figado"],
            hemoglobina_glicada=body["hemoglobina_glicada"],
            producao_de_insulina=body["producao_de_insulina"]
        )
        relatorio.save()
    except:
        raise ParseError(f"Ocorreu um erro durante a criação do relatório.")

    return Response("Formulario registrado")


@api_view(['GET', 'PATCH'])
def consulta_request(request: HttpRequest, consulta_id) -> Response:
    if request.method == 'GET':
        return informacoes_usuario(consulta_id)
    else:
        return finalizar_consulta(consulta_id)


def informacoes_usuario(consulta_id) -> Response:
    try:
        consulta = Consulta.objects.values('paciente__id').get(id=consulta_id)
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={consulta['paciente__id']} não foi encontrado")

    payload = {'user_id': consulta['paciente__id']}

    nutrition = {}
    resp = requests.get('http://127.0.0.1:8000/api/nutricionista/informacoes_nutricionais_paciente', params=payload)
    if (resp.status_code == 200):
        nutrition = resp.json()

    medical = {}
    resp = requests.get('http://127.0.0.1:8000/api/paciente/informacoes_medicas', params=payload)
    if (resp.status_code == 200):
        medical = resp.json()

    return Response({
        "medical": medical,
        "nutrition": nutrition
    })


def finalizar_consulta(consulta_id) -> Response:
    """
    Atualiza o status da consulta para "Realizada"

    Path parms:
        consulta_id: id da consulta a ser finalizada
    """
    try:
        consulta = Consulta.objects.get(id=consulta_id)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={consulta_id} não encontrada")

    consulta.status = 2
    consulta.save()

    return Response("Consulta finalizada")
