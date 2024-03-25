from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta


@api_view(['GET'])
def dieta(request):
    
    return Response({'message': 'Connected.'})


@api_view(['POST'])
def salvaDieta(request):
    """
    Salva uma dieta receitada pelo nutricionista.
    """
    
    return Response({'message': 'Connected.'})