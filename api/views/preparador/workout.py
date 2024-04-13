from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json

from api.models import TreinoFisico
from api.models import Usuario
from api.models import RelatorioPreparadorFisico

@api_view(['POST'])
def create(request: HttpRequest) -> Response:
    """
    Cria um novo treino para o preparador físico

    Query parameters:
        user_id: ID usuário do preparador
        titulo: título do treino,
        treino: descrição completa do treino
    """

    body = json.loads(request.body.decode('utf-8'))

    try:
        usuario = Usuario.objects.get(id=body['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    try:
        treino = TreinoFisico(profissional=usuario, titulo=body['titulo'], treino=body['treino'])
        treino.save()
    except :
        raise ParseError(f"Ocorreu um erro durante a criação do treino.")

    return Response("Treino criado")

@api_view(['PUT'])
def update(request: HttpRequest, workout_id) -> Response:
    
    body = json.loads(request.body.decode('utf-8'))

    try:
        treino = TreinoFisico.objects.get(id=workout_id)
        treino.titulo = body['title']
        treino.treino = body['workout']
        treino.save()
    except:
        raise ParseError(f"Ocorreu um erro durante a atualizacão do treino {workout_id}")

    return Response(f"Treino {workout_id} atualizado")    

@api_view(['GET'])
def workouts(request: HttpRequest) -> Response:
    
    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data.get('user_id'))
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data.get('user_id')} não foi encontrado")

    treinos = TreinoFisico.objects.filter(
        profissional=usuario,
    ).values(
        'id',
        'titulo',
        'treino',      
    )

    return Response(treinos)

@api_view(['GET'])
def treino_paciente(request):
    """
    Retorna o treino mais recente do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    treino = RelatorioPreparadorFisico.objects.filter(
        consulta__paciente_id=data['user_id'],
    ).values(
        'consulta__profissional__nome',
        'treino_fisico__treino',
        'treino_fisico__titulo',
    ).order_by('-created_at').first()

    if(treino==None):
        return Response({}, 400)
    else:
        return Response(treino)