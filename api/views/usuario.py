from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

@api_view(['POST'])
def create(request):
    data = json.loads(request.body)
    print(data)
    return Response({'data': data})

