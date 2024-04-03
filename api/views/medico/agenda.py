from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
from datetime import datetime

# from api.models import ConsultaMedico
# from api.models import Medico


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

    # data = request.GET

    # # Validations
    # try: 
    #     start_date = datetime.strptime(data.get('start_date', ''), '%Y-%m-%d')
    #     end_date = datetime.strptime(data.get('end_date', ''), '%Y-%m-%d')
    # except ValueError:
    #     raise ParseError('Datas inical e final precisam estar no formato YYYY-mm-dd')

    # try: 
    #     medico = Medico.objects.get(id=data.get('user_id'))
    # except Medico.DoesNotExist:
    #     raise ParseError(f"Usuário com id={data.get('user_id')} não foi encontrado")

    # consultas = ConsultaMedico.objects.filter(
    #     profissional=medico,
    #     horario__gte=start_date,
    #     horario__lte=end_date
    # )

    # return Response({'message': consultas.values()})