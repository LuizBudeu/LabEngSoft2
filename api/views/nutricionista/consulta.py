from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

import json

from api.models import Consulta, RelatorioNutricionista


@api_view(['POST'])
def consulta(request: HttpRequest) -> Response:
    """
    Salva um relatório do nutricionista, assim realizando uma consulta.

    Query parameters:
        consulta_id: ID da consulta à qual se refere o relatório salvo.
        detalhes_adicionais: Detalhes opcionais em relação à consulta.
    """
    
    data: dict = json.loads(request.body.decode('utf-8'))

    # Validação
    consulta_id = data.get('consulta_id')
    if not consulta_id:
        raise ParseError(f"Parâmetro consulta_id da requisição é obrigatório. data={data}")
    try:
        consulta_object: Consulta = Consulta.objects.get(id=consulta_id)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={consulta_id} não foi encontrada.")

    try:
        relatorio_obj: RelatorioNutricionista = RelatorioNutricionista.objects.create(**{
            'consulta': consulta_object,
            'detalhes_adicionais': data.get('detalhes_adicionais')
        })
    except Exception as e:
        raise ParseError(f"Erro ao criar registro do relatorio do Nutricionista.\nMensagem de erro: \"{e}\"")

    consulta_object.status = 2
    consulta_object.save()
    return Response({'relatorio_id': relatorio_obj.pk})
