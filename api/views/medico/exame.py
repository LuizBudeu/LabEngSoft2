from rest_framework.decorators import api_view
from rest_framework.response import Response

# from api.models import Consulta


@api_view(['POST'])
def pedirExame(request):
    """
    Solicita um exame para o paciente.
    """
    
    return Response({'message': 'Connected.'})