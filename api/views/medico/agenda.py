from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
from datetime import datetime

from api.models import Consulta
from api.models import Usuario


@api_view(['GET'])
def agenda(request: HttpRequest) -> Response:
    """
    Pega a agenda do médico. Retorna todas as consultas marcadas para esse profissional
    entre uma data inicial e final.

    Query parameters:
        user_id: ID usuário do médico
        start_date: Data inicial, no formato YYYY-mm-dd
        end_date: Data final, no formato YYYY-mm-dd
    """

    data = request.GET

    # Validations
    try: 
        start_date = datetime.strptime(data.get('start_date', ''), '%Y-%m-%d')
        end_date = datetime.strptime(data.get('end_date', ''), '%Y-%m-%d')
    except ValueError:
        raise ParseError('Datas inical e final precisam estar no formato YYYY-mm-dd')

    try: 
        usuario = Usuario.objects.get(id=data.get('user_id'))
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data.get('user_id')} não foi encontrado")

    consultas = Consulta.objects.filter(
        profissional=usuario,
        horario__gte=start_date,
        horario__lte=end_date
    ).order_by('-horario')

    return Response({'message': consultas.values()})