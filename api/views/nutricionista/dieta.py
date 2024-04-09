from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta, RelatorioNutricionista, PedidoExameNutricionista


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