from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

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
        'complemento': usuario.complemento,
        'alergias': paciente['alergias'],
        'tipo_diabetes': paciente['tipo_diabetes']
    }
    return Response(resp)

@api_view(['POST'])
def update_perfil(request):
    """
    Atualiza informações de perfil do paciente.

    Query parameters:
        user_id: ID usuário do paciente
        nome: Nome do paciente,
        data_de_nascimento: Data de nascimento do paciente,
        genero: Gênero do paciente,
        cep: CEp do paciente,
        logradouro: Logradouro do paciente,
        numero: Número do endereço do paciente,
        complemento: Complemento do endereço do paciente,
        alergias: Alergias do paciente,
        tipo_diabetes: Tip ode diabetes do paciente
    """

    body = json.loads(request.body.decode('utf-8'))

    return Response(body)