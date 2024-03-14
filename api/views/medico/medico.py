from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.exceptions import ParseError


from api.models import Medico, Usuario


@api_view(http_method_names=['POST'])
def create_medico(request: HttpRequest):
    
    data = request.POST
    
    print(data)
    
    try:
        usuario = Usuario.objects.get(id=data.get('usuario'))
        medico = Medico.objects.create(
            usuario=usuario,
            crm=data.get('crm'),
            especialidade=data.get('especialidade'),
        )
    except Exception as e:
        raise ParseError(f"Erro ao criar médico: {e}")
    
    return Response({'message': f"Médico {medico.id} criado."})
