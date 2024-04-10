from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
from datetime import datetime
import json

from api.models import Consulta, Usuario


@api_view(['GET'])
def consulta(request):
    
    return Response({'message': 'Connected.'})


@api_view(['POST'])
def salvaRelatorio(request):
    """
    Salva um relatório do nutricionista.
    """
    
    return Response({'message': 'Connected.'})


@api_view(['GET'])
def consultaPaciente(request: HttpRequest) -> Response:
    """
    Pega todas as consultas nutricionais de um paciente.

    Query parameters:
        paciente_id: ID de usuário do paciente referente à busca.
    """

    data = request.GET

    try:
        paciente = Usuario.objects.get(id=data.get('paciente_id'))
        consultas = Consulta.objects.filter(
            paciente=paciente,
            profissional__ocupacao=2, # Nutricionistas
            horario__gt=datetime.now()
        ).order_by('horario').values(
            'id',
            'profissional_id',
            'profissional__nome',
            'profissional__ocupacao',
            'profissional__logradouro',
            'profissional__numero',
            'profissional__complemento',
            'horario',
            'valor',
            'tarifa',
            'duracao_em_minutos',
            'status'
        )
    except Usuario.DoesNotExist:
        raise ParseError(f"Erro: paciente com id de usuário {data.get('paciente_id')} não foi encontrado.")
    except Consulta.DoesNotExist:
        return Response({
            'found': True,
            'message': 'Não foram encontradas consultas para o paciente em questão.'
        })

    return Response(consultas)


@api_view(['GET'])
def horariosProfissional(request: HttpRequest) -> Response:
    """
    Pega todas as consultas de um nutricionista.

    Query parameters:
        profissional_id: ID de usuário do nutricionista referente à busca.
    """

    data = request.GET

    try:
        profissional = Usuario.objects.get(id=data.get('profissional_id'))
        if profissional.ocupacao != 2:
            raise ParseError('Erro: id fornecido não pertence a um nutricionista')
        professionalSchedule =  Consulta.objects.filter(
            profissional=profissional,
            horario__gt=datetime.today().date()
        ).exclude(
            status=1 # Exclui consultas canceladas
        ).values(
            'horario'
        )
    except Usuario.DoesNotExist:
        raise ParseError(f"Erro: não foi encontrado um nutricionista com id de usuário {data.get('profissional_id')}.")

    return Response(professionalSchedule)