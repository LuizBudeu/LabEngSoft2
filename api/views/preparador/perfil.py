from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

import json
import jwt

from api.models import Usuario
from api.models import ExtUsuario
from api.models import DadosBancariosRecebimento

@api_view(['GET'])
def user_id(request: HttpRequest) -> Response:
    """
        Pega id do paciente.
    """
    token = request.headers.get('Authorization')

    if(token != ""):
        token = token.split(" ", 1)[1]

        token_decoded = jwt.decode(token, options={"verify_signature": False})["oid"]

        user_id = None

        try: 
            ext_usuario = ExtUsuario.objects.get(
                ext_id=token_decoded,
                ocupacao=3
            )
            user_id = ext_usuario.usuario_id
        except ExtUsuario.DoesNotExist:
            ext_usuario = ExtUsuario.objects.create(
                ext_id=token_decoded,
                ocupacao=3
            )
        return Response({
            'user_id': user_id
        })
    else:
        return Response("Token inválido", 401)

@api_view(['GET'])
def perfil(request: HttpRequest) -> Response:
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

    resp = {
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

@api_view(['POST'])
def update_perfil(request: HttpRequest) -> Response:
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

    return Response("Perfil atualizado")

@api_view(['GET'])
def lista_profissionais(request):
    
    """
    Lista médicos.

    Query parameters:
        name: Nome do prifissional. (opcional)
    """

    data = request.GET

    profissionais =  Usuario.objects.filter(
        ocupacao=3, # Preparador
        nome__contains=("" if data['name'] == None else data['name'])
    ).values(
        'id',
        'nome',
        'ocupacao',
        'logradouro',
        'numero',
        'complemento'
    )

    return Response(profissionais)

@api_view(['GET'])
def informacao_bancaria(request):
    
    """
    Retorna o número da conta do profissional.

    Query parameters:
        user_id: Id do prifissional
    """

    data = request.GET

    try:
        conta =  DadosBancariosRecebimento.objects.get(
            profissional_id=data['user_id']
        )
        return Response(conta.conta)
    except Usuario.DoesNotExist:
        raise ParseError(f"Conta para profissional com id={body['user_id']} não foi encontrado")