from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
from datetime import datetime

from api.models import Usuario


@api_view(['GET'])
def listaProfissionais(request: HttpRequest) -> Response:
    """
    Retorna uma lista com todos os nutricionistas. Caso queira, a pessoa pode especificar um nome
    no campo 'name', e a busca retorna profissionais cujo nome tenha o valor desse campo.

    Query parameters:
        name (opcional): Nome do nutricionista buscado.
    """

    data = request.GET

    profissionais =  Usuario.objects.filter(
        nome__contains=("" if data.get('name') == None else data['name']),
        ocupacao=2 # Nutricionistas
    ).values(
        'id',
        'nome',
        'ocupacao',
        'logradouro',
        'numero',
        'complemento'
    )

    return Response(profissionais)