from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta, Usuario
import datetime

@api_view(['GET'])
def agenda(request):
    """
    Pega a agenda do paciente. Retorna todas as consultas marcadas para ele após a data de hoje.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")
    
    consultas = Consulta.objects.filter(
        paciente=usuario,
        # status__in=[0, 4]
        horario__gt=datetime.date.today()
    ).order_by('horario').values(
        'profissional_id',
        'profissional__nome',
        'profissional__ocupacao',
        'horario',
        'duracao_em_minutos',
        'status'
    )

    return Response({'message': consultas})