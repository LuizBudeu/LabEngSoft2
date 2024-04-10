from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
from datetime import datetime
import json

from api.models import Consulta, Usuario, RelatorioNutricionista


@api_view(['GET'])
def dieta(request):
    
    return Response({'message': 'Connected.'})


@api_view(['POST'])
def salvaDieta(request):
    """
    Salva uma dieta receitada pelo nutricionista.
    """
    
    return Response({'message': 'Connected.'})


@api_view(['GET'])
def dietaPaciente(request: HttpRequest) -> Response:
    """
    Pega a última dieta de um paciente.

    Query parameters:
        paciente_id: ID de usuário do paciente referente à busca.
    """

    data = request.GET

    try:
        paciente = Usuario.objects.get(id=data.get('paciente_id'))
        dieta = RelatorioNutricionista.objects.filter(
            consulta__paciente=paciente,
        ).exclude(
            dieta__isNull=False
        ).exclude(
            dieta=''
        ).values(
            'consulta__profissional__nome',
            'dieta__descricao_curta',
            'dieta__descricao',
            'dieta__duracao_em_dias',
            'dieta__calorias',
        ).order_by('-created_at').first()
    except Usuario.DoesNotExist:
        raise ParseError(f"Erro: não foi encontrado um paciente com id de usuário {data.get('paciente_id')}.")

    return Response(dieta)