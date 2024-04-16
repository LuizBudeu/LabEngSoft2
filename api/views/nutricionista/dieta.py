from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import requests
import json

from api.models import Usuario, Consulta, RelatorioNutricionista, PedidoExameNutricionista, Dieta


@api_view(['GET'])
def dieta(request: HttpRequest) -> Response:
    """
    Pega uma dieta a partir da consulta em que ela foi feita.

    Query Parameters:
        consulta_id: ID da consulta referente à requisição.
    """
    
    data = request.GET

    # Validação necessária
    try:
        consulta = Consulta.objects.get(id=data.get('consulta_id'))
        relatorio = RelatorioNutricionista.objects.get(consulta=consulta)
        dieta = relatorio.dieta
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={data.get('consulta_id')} não foi encontrada.")
    except RelatorioNutricionista.DoesNotExist:
        return Response({'found': False, 'message': f"Consulta com id={data.get('consulta_id')} não possui relatório, ainda."})
    
    if not dieta:
        return Response({'found': False, 'message': f"Relatório da consulta com id={data.get('consulta_id')} não possui dieta, ainda."})
    
    return Response({
        'found': True,
        'descricao_curta': dieta.descricao_curta,
        'descricao': dieta.descricao,
        'duracao_em_dias': dieta.duracao_em_dias,
        'calorias': dieta.calorias
    })


@api_view(['POST'])
def salvaDieta(request: HttpRequest) -> Response:
    """
    Salva uma dieta receitada pelo nutricionista.
    
    Body parameters:
        relatorio_id (int): ID do relatório de nutricionista ao qual será associada a dieta.
        descricao_curta (str): descrição resumida da dieta, como: "Dieta hipertrofia sem glúten".
        descricao (str): descrição completa da rotina da dieta.
        duracao_em_dias (int): Duração da dieta receitada, em dias.
        calorias (int): número de calorias da dieta, em kcal
    """
    
    body: dict = json.loads(request.body.decode('utf-8'))

    # Validação necessária
    try:
        relatorio = RelatorioNutricionista.objects.get(id=body.get('relatorio_id'))
    except RelatorioNutricionista.DoesNotExist:
        raise ParseError(f"Relatório de nutricionista com id={body.get('relatorio_id')} não foi encontrado.")

    try:    
        dieta = Dieta.objects.create(
            descricao_curta=body.get('descricao_curta'),
            descricao=body.get('descricao'),
            duracao_em_dias=body.get('duracao_em_dias'),
            calorias=body.get('calorias')
        )
    except Exception as e:
        raise ParseError(f"Erro ao criar dieta: \"{e}\"")
    
    relatorio.dieta = dieta
    relatorio.save()

    return Response({'dieta_id': dieta.pk})

@api_view(['GET'])
def dieta_paciente(request: HttpRequest) -> Response:
    """
    Retorna a dieta mais recente do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    dieta = RelatorioNutricionista.objects.filter(
        consulta__paciente_id=data['user_id'],
    ).values(
        'consulta__profissional__nome',
        'dieta__descricao_curta',
        'dieta__descricao',
        'dieta__duracao_em_dias',
        'dieta__calorias',
    ).order_by('-created_at').first()

    if(dieta==None):
        return Response({}, 400)
    else:
        return Response(dieta)


@api_view(['GET'])
def exames_paciente(request: HttpRequest) -> Response:
    """
    Retorna os exames abertos do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    examesNutricionista = PedidoExameNutricionista.objects.filter(
        paciente_id=data['user_id'],
        status=0
    ).values(
        'nutricionista_id',
        'nutricionista__ocupacao',
        'nutricionista__nome',
        'nutricionista__logradouro',
        'nutricionista__numero',
        'nutricionista__complemento',
        'tipo_exame',
    ).order_by('-created_at')

    return Response(examesNutricionista)


@api_view(['GET'])
def informacoesNutricionais(request: HttpRequest) -> Response:
    """
    Pega informações pertinentes para a formulação de uma dieta, incluindo dados de gasto calórico.

    Query Parameters:
        paciente_id: ID de usuário do paciente da requisição.
    """

    data = request.GET

    paciente_id = data.get('paciente_id')
    try:
        user_obj = Usuario.objects.get(id=paciente_id)
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário de id={paciente_id} não foi encontrado.")

    payload = {'user_id': user_obj.pk}
    infos_nutricionais = requests.get("http://127.0.0.1:8000/api/paciente/perfil_nutricional", params=payload).json()
    infos_caloricas = requests.get("http://127.0.0.1:8000/api/preparador/informacoes_fisicas_paciente", params=payload).json()
    
    return Response({**infos_nutricionais, **infos_caloricas})
    