from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json
import jwt

from api.models import ExtUsuario, Usuario, Nutricionista, DadosBancariosRecebimento


@api_view(['GET'])
def user_id(request: HttpRequest) -> Response:
    """
        Pega id do nutricionista.
    """
    token = request.headers.get('Authorization')

    if(token != ""):
        token = token.split(" ",1)[1]

        token_decoded = jwt.decode(token, options={"verify_signature": False})["oid"]

        user_id = None

        try: 
            ext_usuario = ExtUsuario.objects.get(ext_id=token_decoded)
            user_id = ext_usuario.usuario.pk
        except ExtUsuario.DoesNotExist:
            ext_usuario = ExtUsuario.objects.create(
                ext_id=token_decoded,
            )
        return Response({
            'user_id': user_id
        })
    else:
        return Response("Token inválido", 401)


@api_view(['GET'])
def perfil(request: HttpRequest) -> Response:
    """
    Pega informações de perfil do nutricionista.

    Query parameters:
        user_id: ID de usuário do nutricionista
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")
    
    nutricionista = Nutricionista.objects.filter(
        usuario=usuario,
    ).values('crn').first()

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
        'crn': nutricionista['crn']
    }

    # resp_test = {
    #     'email': 'a@b.c',
    #     'nome': 'filipe arraia',
    #     'cpf': '1',
    #     'data_de_nascimento': '2002-04-30',
    #     'genero': 'outro',
    #     'cep': '00000-000',
    #     'logradouro': 'Travessa do Politécnico',
    #     'numero': '158',
    #     'complemento': '---',
    #     'crn': '12345678'
    # }

    return Response(resp)

@api_view(['POST'])
def update_perfil(request: HttpRequest) -> Response:
    """
    Atualiza informações de perfil do nutricionista.

    Query parameters:
        user_id: ID usuário do nutricionista
        nome: Nome do nutricionista,
        data_de_nascimento: Data de nascimento do nutricionista,
        genero: Gênero do nutricionista,
        cep: CEP do nutricionista,
        logradouro: Logradouro do nutricionista,
        numero: Número do endereço do nutricionista,
        complemento: Complemento do endereço do nutricionista,
        crn: Número de CRN do nutricionista
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
        nutricionista = Nutricionista.objects.get(usuario_id=body['user_id'])
        nutricionista.crn = body['crn']
        nutricionista.save()

    except Nutricionista.DoesNotExist:
        raise ParseError(f"Nutricionista com id={body['user_id']} não foi encontrado")

    return Response("Nutricionista atualizado")

@api_view(['GET'])
def lista_profissionais(request: HttpRequest) -> Response:
    
    """
    Lista nutricionistas.

    Query parameters:
        name: Nome do prifissional. (opcional)
    """

    data = request.GET

    profissionais =  Usuario.objects.filter(
        ocupacao=2, # Nutricionista
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
def informacao_bancaria(request: HttpRequest) -> Response:
    
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
        raise ParseError(f"Conta para profissional com id={data['user_id']} não foi encontrado")