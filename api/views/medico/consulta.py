from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.exceptions import ParseError
from rest_framework.parsers import JSONParser 

from api.models import Consulta, Usuario, Medico


@api_view(['GET'])
def consulta(request: HttpRequest):
    
    return Response({'message': 'Connected.'})


@api_view(http_method_names=['POST'])
def comeca_consulta(request: HttpRequest):
    """
    Começa uma consulta médica.
    """
    
    data = request.POST
    
    try:
        paciente = Usuario.objects.get(id=data.get('paciente'))
        profissional = Usuario.objects.get(id=data.get('profissional'))
        consulta = Consulta.objects.create(
            paciente=paciente,
            profissional=profissional,
            horario=data.get('horario'),
            status=4,  # Pendente
        )
    except Exception as e:
        raise ParseError(f"Erro ao criar consulta: {e}")
    
    return Response({'message': f"Consulta {consulta.id} criada."})


@api_view(http_method_names=['PUT'])
def finaliza_consulta(request: HttpRequest):
    """
    Finaliza uma consulta médica.
    """
    
    data = JSONParser().parse(request) 
    
    try:
        consulta = Consulta.objects.get(id=data.get('consulta_id'))
        consulta.status = 2  # Realizada
        consulta.save()
    except Exception as e:
        raise ParseError(f"Erro ao criar consulta: {e}")
    
    return Response({'message': f"Consulta {consulta.id} finalizada."})


@api_view(['POST'])
def salva_relatorio(request: HttpRequest):
    """
    Salva um relatório médico.
    """
    
    return Response({'message': 'Connected.'})