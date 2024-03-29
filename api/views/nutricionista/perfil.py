from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from api.models import Usuario, Nutricionista


@api_view(['GET'])
def perfil(request):
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
def update_perfil(request):
    """
    Atualiza informações de perfil do nutricionista.

    Query parameters:
        user_id: ID usuário do nutricionista
        nome: Nome do nutricionista,
        data_de_nascimento: Data de nascimento do nutricionista,
        genero: Gênero do nutricionista,
        cep: CEp do nutricionista,
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