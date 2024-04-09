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
        user_id: ID usuário do preparador
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
    ).order_by('horario').values(
        'id',
        'paciente__nome',
        'horario',
        'duracao_em_minutos',
        'status'       
    )

    return Response(consultas)

@api_view(['GET'])
def consulta_paciente(request):
    """
    Pega as consultas de paciente. Retorna todas as consultas marcadas para ele após a data de hoje, 
    com informações do profissional.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    consultas = Consulta.objects.filter(
        paciente_id=data['user_id'],
        profissional__ocupacao=3, # Preparador
        horario__gt=datetime.utcnow()
    ).order_by('horario').values(
        'id',
        'profissional_id',
        'profissional__nome',
        'profissional__ocupacao',
        'profissional__logradouro',
        'profissional__numero',
        'profissional__complemento',
        'horario',
        'valor',
        'tarifa',
        'duracao_em_minutos',
        'status'
    )

    return Response(consultas)