from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta


@api_view(['GET'])
def consulta(request):
    
    return Response({'message': 'Connected.'})


@api_view(['POST'])
def salvaRelatorio(request):
    """
    Salva um relatório do nutricionista.
    """
    
    return Response({'message': 'Connected.'})