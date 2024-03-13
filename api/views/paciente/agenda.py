from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Consulta

@api_view(['GET'])
def agenda(request: HttpRequest) -> Response:
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
        status__in=[0, 4]
        horario__gt=datetime.date.today()
    )

    return Response({'message': consultas.values()})