from rest_framework.decorators import api_view
from rest_framework.response import Response

# from api.models import Consulta


@api_view(['GET'])
def avaliacao(request):
    
    return Response({'message': 'Connected.'})


@api_view(['POST'])
def salvaAvaliacao(request):
    """
    Salva uma Avaliação Nutricional realizada pelo nutricionista.
    """
    
    return Response({'message': 'Connected.'})