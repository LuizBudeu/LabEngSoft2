from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import requests

from api.models import Usuario, Paciente, Consulta, RelatorioNutricionista, PedidoExameNutricionista


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
def dieta_paciente(request):
    """
    Retorna a dieta mais recente do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    dieta = RelatorioNutricionista.objects.filter(
        consulta__paciente_id=data['user_id'],
    ).values(
        'consulta__profissional__nome',
        'dieta__descricao_curta',
        'dieta__descricao',
        'dieta__duracao_em_dias',
        'dieta__calorias',
    ).order_by('-created_at').first()

    if(dieta==None):
        return Response({}, 400)
    else:
        return Response(dieta)


    return Response(dieta)

@api_view(['GET'])
def exames_paciente(request):
    """
    Retorna os exames abertos do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    examesNutricionista = PedidoExameNutricionista.objects.filter(
        paciente_id=data['user_id'],
        status=0
    ).values(
        'nutricionista_id',
        'nutricionista__ocupacao',
        'nutricionista__nome',
        'nutricionista__logradouro',
        'nutricionista__numero',
        'nutricionista__complemento',
        'tipo_exame',
    ).order_by('-created_at')

    return Response(examesNutricionista)


@api_view(['GET'])
def informacoesNutricionais(request: HttpRequest) -> Response:
    """
    Pega informações pertinentes para a formulação de uma dieta, incluindo dados de gasto calórico.

    Query Parameters:
        paciente_id: ID de usuário do paciente da requisição.
    """

    data = request.GET

    paciente_id = data.get('paciente_id')
    try:
        user_obj = Usuario.objects.get(id=paciente_id)
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário de id={paciente_id} não foi encontrado.")

    payload = {'user_id': user_obj.pk}
    infos_nutricionais = requests.get("http://127.0.0.1:8000/api/paciente/perfil_nutricional", params=payload).json()
    infos_caloricas = requests.get("http://127.0.0.1:8000/api/preparador/informacoes_fisicas_paciente", params=payload).json()
    
    return Response({**infos_nutricionais, **infos_caloricas})
    