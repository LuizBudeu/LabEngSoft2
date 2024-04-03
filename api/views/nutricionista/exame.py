from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

import json

from api.models import Nutricionista, Paciente, PedidoExameNutricionista


@api_view(['POST'])
def pedirExame(request: HttpRequest) -> Response:
    """
    Solicita um exame para o paciente.

    Query parameters:
        nutricionista_id: ID do nutricionista que solicita o exame.
        paciente_id: ID do paciente ao qual está sendo pedido o exame.
        tipo_exame: Qual o exame sendo pedido.
    """

    body: dict = json.loads(request.body.decode('utf-8'))

    try:
        nutricionista_obj = Nutricionista.objects.get(id=body.get('nutricionista_id')).usuario
        paciente_obj = Paciente.objects.get(id=body.get('paciente_id')).usuario
    except Nutricionista.DoesNotExist:
        raise ParseError(f"Não foi possível encontrar nutricionista com id={body.get('nutricionista_id')}")
    except Paciente.DoesNotExist:
        raise ParseError(f"Não foi possível encontrar paciente com id={body.get('paciente_id')}")
    
    try:
        exame = PedidoExameNutricionista.objects.create(
            nutricionista=nutricionista_obj,
            paciente=paciente_obj,
            tipo_exame=body.get('tipo_exame'),
            status=0
        )
    except:
        raise ParseError(f'Erro ao criar registro do pedido de exame.')
    
    return Response({'pedido_exame_id': exame.pk})