from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

from api.models import Usuario, PedidoExameNutricionista


@api_view(['POST'])
def pedirExame(request):
    """
    Solicita um exame para o paciente.
    """
    
    return Response({'message': 'Connected.'})

@api_view(['GET'])
def examesPaciente(request: HttpRequest) -> Response:
    """
    Pega os exames (nutricionista) em aberto de um paciente.

    Query parameters:
        paciente_id: ID de usuário do paciente referente à busca.
    """

    data = request.GET

    try:
        paciente = Usuario.objects.get(id=data.get('paciente_id'))
        examesNutricionista = PedidoExameNutricionista.objects.filter(
            paciente=paciente,
            status=0
        ).values(
            'nutricionista_id',
            'nutricionista__nome',
            'nutricionista__logradouro',
            'nutricionista__numero',
            'nutricionista__complemento',
            'tipo_exame',
        ).order_by('-created_at')
    except Usuario.DoesNotExist:
        raise ParseError(f"Erro: não foi encontrado um paciente com id de usuário {data.get('paciente_id')}.")

    return Response(examesNutricionista)