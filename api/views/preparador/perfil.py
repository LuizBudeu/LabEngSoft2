from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from api.models import Usuario
from api.models import Paciente


@api_view(['GET'])
def perfil(request):
    """
    Pega informações de perfil paciente.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")
    
    paciente = Paciente.objects.filter(
        usuario=usuario,
    ).values('alergias', 'tipo_diabetes').first()

    resp = {
        'email': usuario.email,
        'nome': usuario.nome,
        'cpf': usuario.cpf,
        'data_de_nascimento': usuario.data_de_nascimento,
        'genero': usuario.genero,
        'cep': usuario.cep,
        'logradouro': usuario.logradouro,
        'numero': usuario.numero,
        'complemento': usuario.complemento
    }
    return Response(resp)