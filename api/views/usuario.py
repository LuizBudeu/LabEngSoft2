from rest_framework.decorators import api_view
from rest_framework.response import Response

import json
from ..models import Paciente


@api_view(['POST'])
def create(request): # mano alguem faz isso pf
    # 0 sanitagem!!!!!


    data = json.loads(request.body)

    Paciente.objects.create(**data)  # vai dar erro de validação saca
    print(data)
    return Response({'data': data})

