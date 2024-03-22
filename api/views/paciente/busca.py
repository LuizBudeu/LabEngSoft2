from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Usuario, Consulta
from datetime import timedelta
import datetime

@api_view(['GET'])
def buscaProfissionais(request):
    
    """
    Lista profissionais do tipo especificado para o paciente.

    Query parameters:
        user_id: ID usuário do paciente
        type: Tipo de profissionais.
        name: Nome do prifissional. (opcional)
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")

    profissionais =  Usuario.objects.filter(
        ocupacao=data['type'],
        nome__contains=("" if data['name'] == None else data['name'])
    ).values(
        'id',
        'nome',
        'ocupacao',
        'logradouro',
        'numero',
        'complemento'
    )

    return Response(profissionais)

@api_view(['GET'])
def horarios(request):
    
    """
    Lista horários com consultata do profissional e usuário. para 1 mês após a data atual.

    Query parameters:
        user_id: ID usuário do paciente
        professional_id: ID usuário do profissional
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")

    try: 
        profissional = Usuario.objects.get(id=data['professional_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"profissional com id={data['professional_id']} não foi encontrado")

    professionalSchedule =  Consulta.objects.filter(
        profissional=profissional,
        horario__gt=datetime.date.today()
    ).exclude(
        status=1 # Exclui consultas canceladas
    ).values(
        'horario'
    )

    usuarioSchedule =  Consulta.objects.filter(
        paciente=usuario,
        horario__gt=datetime.datetime.utcnow()
    ).exclude(
        status=1 # Exclui consultas canceladas
    ).values(
        'horario'
    )

    date = datetime.date.today()
    max_days = 30
    extra_day = 0
    available_schedule = []
    min_hour = 8
    max_hour = 18

    while(extra_day < max_days):
        date_day = date.strftime("%Y-%m-%d")

        hour = min_hour

        while(hour <= max_hour):
            status = 0 # Horário livre
            date_str = date_day + " " + "{0:0=2d}".format(hour+3)
            custom_date = datetime.datetime.strptime(date_str, '%Y-%m-%d %H')
            if(custom_date <= datetime.datetime.utcnow()):
                status = 1
            else:
                for consulta in professionalSchedule:
                    if str.startswith(str(consulta['horario']), date_str):
                            status = 1
                            break

                if status == 0:
                    for consulta in usuarioSchedule:
                        if str.startswith(str(consulta['horario']), date_str):
                            status = 1
                            break

            available_schedule.append({
                "data": date_day,
                "hora": hour,
                "status": status
            })
            hour += 1

        extra_day += 1
        date = date + timedelta(days=1)

    return Response(available_schedule)