from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest


from api.models import Consulta
from api.models import RelatorioNutricionista


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
def informacoes_nutricionais_paciente(request: HttpRequest) -> Response:
    """
    Fornece informações do contexto do nutricionista
    que sejam úteis para outros tipos de profissionais

    query params:
        - user_id: id do usuário que se busca as informações
    """
    user_id = request.GET['user_id']
    
    relatorio = RelatorioNutricionista.objects.filter(
        consulta__paciente_id=user_id,
    ).values(
        'dieta__descricao_curta',
        'dieta__descricao',
        'dieta__calorias',
        'detalhes_adicionais',
    ).order_by('-created_at').first()

    if (relatorio == None):
        return Response({}, 400)

    return Response({
        'dieta__descricao_curta': relatorio['dieta__descricao_curta'],
        'dieta__descricao': relatorio['dieta__descricao'],
        'dieta__calorias': relatorio['dieta__calorias'],
        'detalhes_adicionais': relatorio['detalhes_adicionais'],
    })