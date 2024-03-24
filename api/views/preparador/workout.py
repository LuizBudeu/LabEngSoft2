from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json

from api.models import TreinoFisico
from api.models import Usuario

@api_view(['POST'])
def create(request: HttpRequest) -> Response:
    """
    Cria um novo treino para o preparador físico

    Query parameters:
        user_id: ID usuário do preparador
        title: título do treino,
        workout: descrição completa do treino
    """

    body = json.loads(request.body.decode('utf-8'))
    print(body)

    try:
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    try:
        treino = TreinoFisico(profissional=usuario, titulo=body['title'], treino=body['workout'])
        treino.save()
    except :
        raise ParseError(f"Ocorreu um erro durante a criação do treino.")

    return Response("Treino criado")

@api_view(['GET'])
def workouts(request: HttpRequest) -> Response:
    
    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data.get('user_id'))
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data.get('user_id')} não foi encontrado")

    treinos = TreinoFisico.objects.filter(
        professional=usuario,
    ).values(
        'id',
        'titulo',
        'treino',      
    )

    return Response(treinos)