from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json
import jwt

from api.models import Usuario
from api.models import ExtUsuario
from api.models import Paciente

@api_view(['GET'])
def user_id(request):
    """
        Pega id do paciente.
    """
    token = request.headers.get('Authorization')

    if(token != ""):
        token = token.split(" ",1)[1]

        token_decoded = jwt.decode(token, options={"verify_signature": False})["oid"]

        user_id = None

        try: 
            ext_usuario = ExtUsuario.objects.get(ext_id=token_decoded)
            user_id = ext_usuario.usuario_id
        except ExtUsuario.DoesNotExist:
            ext_usuario = ExtUsuario.objects.create(
                ext_id=token_decoded,
            )
        return Response({
            'user_id': user_id
        })
    else:
        return Response("Token inválido", 401)

@api_view(['POST'])
def create_profile(request):
    """
    Cria perfil do paciente.

    Query parameters:
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

    token = request.headers.get('Authorization')

    if(token != ""):
        token = token.split(" ",1)[1]

        token_decoded = jwt.decode(token, options={"verify_signature": False})["oid"]

        try: 
            ext_usuario = ExtUsuario.objects.get(ext_id=token_decoded)
            if(ext_usuario.usuario_id == None):
                usuario = Usuario.objects.create(
                    nome = body['nome'],
                    data_de_nascimento = body['data_de_nascimento'],
                    genero = body.get('genero', 0),
                    cpf = body['cpf'],
                    cep = body['cep'],
                    logradouro = body['logradouro'],
                    numero = body['numero'],
                    complemento = body.get('complemento', None),
                    ocupacao=0
                )
                paciente = Paciente.objects.create(
                    usuario = usuario,
                    alergias = body.get('alergias', None),
                    tipo_diabetes = body.get('tipo_diabetes', 0)
                )
                ext_usuario.usuario = usuario
                ext_usuario.save()
                return Response({
                    'user_id': usuario.id
                })
            else:
                raise ParseError(f"Token fornecido é inválido")
        except ExtUsuario.DoesNotExist:
            raise ParseError(f"Usuário com token fornecido não foi encontrado")
    else:
        return Response("Token inválido", 401)

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

    try:
        usuario = Usuario.objects.get(id=body['user_id'])
        usuario.nome = body['nome']
        usuario.data_de_nascimento = body['data_de_nascimento']
        usuario.genero = body['genero']
        usuario.cep = body['cep']
        usuario.logradouro = body['logradouro']
        usuario.numero = body['numero']
        usuario.complemento = body['complemento']
        usuario.save()
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={body['user_id']} não foi encontrado")

    try:
        paciente = Paciente.objects.get(usuario_id=body['user_id'])
        paciente.alergias = body['alergias']
        paciente.tipo_diabetes = body['tipo_diabetes']
        paciente.save()

    except Paciente.DoesNotExist:
        raise ParseError(f"Paceinte com id={body['user_id']} não foi encontrado")

    return Response("Paciente atualizado")

@api_view(['GET'])
def informacoes_medicas(request: HttpRequest) -> Response:
    """
    Pega informações nutricionais de um paciente.

    Query parameters:
        user_id: ID usuário do paciente
    """

    id = request.GET.get('user_id')

    try: 
        usuario = Usuario.objects.get(id=id)
        paciente = Paciente.objects.get(usuario=usuario)
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={id} não foi encontrado")
    except Paciente.DoesNotExist:
        raise ParseError(f"Usuário com id={id} não é um paciente.")

    return Response({
        'alergias': paciente.alergias,
        'tipo_diabetes': paciente.tipo_diabetes
    })