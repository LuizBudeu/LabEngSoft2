from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta, Usuario
import datetime
import json

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
    
    consultas = Consulta.objects.filter(
        paciente=usuario,
        # status__in=[0, 4]
        horario__gt=datetime.date.today()
    ).order_by('horario').values(
        'id',
        'profissional_id',
        'profissional__nome',
        'profissional__ocupacao',
        'profissional__logradouro',
        'profissional__numero',
        'profissional__complemento',
        'horario',
        'duracao_em_minutos',
        'status'
    )

    return Response(consultas)

@api_view(['POST'])
def createAppointment(request):
    """
    Cria uma nova consulta.

    Query parameters:
        user_id: ID usuário do paciente
        professional_id: ID usuário do profissional
        horario: Data e hora da consulta
        duracao: Duracao em minutos
    """

    body = json.loads(request.body.decode('utf-8'))

    try: 
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    try: 
        profissional = Usuario.objects.get(id=body['professional_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Profissional com id={body['professional_id']} não foi encontrado")

    consultaProfissional = Consulta.objects.filter(
        profissional=profissional,
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
    
    consulta = Consulta.objects.create(
        paciente=usuario,
        profissional=profissional,
        horario = body['horario'],
        duracao_em_minutos = body['duracao'],
        status=4 # consulta pendente
    )

    return Response("Consulta criada")