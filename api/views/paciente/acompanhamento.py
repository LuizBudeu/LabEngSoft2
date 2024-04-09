from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
import requests

from api.models import Usuario, RelatorioNutricionista, RelatorioPreparadorFisico, PedidoExameMedico, PedidoExameNutricionista


@api_view(['GET'])
def acompanhamento(request):
    """
    Lista de acomapanhamentos de um paciente. Apresenta a dieta e treino mais recente e os exames em aberto.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")

    payload = {'user_id': data['user_id']}

    resp = requests.get('http://localhost:8000/api/nutricionista/dieta_paciente', params=payload)
    # resp = requests.get('../../nutricionista/dieta_paciente', params=payload)
    dieta = None
    if(resp.status_code == 200):
        dieta = resp.json()

    resp = requests.get('http://localhost:8000/api/preparador/treino_paciente', params=payload)
    treino = None
    if(resp.status_code == 200):
        treino = resp.json()

    resp = requests.get('http://localhost:8000/api/medico/exames_paciente', params=payload)
    examesMedicos = []
    if(resp.status_code == 200):
        examesMedicos = resp.json()

    resp = requests.get('http://localhost:8000/api/nutricionista/exames_paciente', params=payload)
    examesNutricionista = []
    if(resp.status_code == 200):
        examesNutricionista = resp.json()

    return Response({
        "dieta": dieta,
        "treino": treino,
        "examesMedico": examesMedicos,
        "examesNutricionista": examesNutricionista
    })