from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

import json

from api.models import Consulta, RelatorioNutricionista, Dieta


@api_view(['GET'])
def dieta(request: HttpRequest) -> Response:
    """
    Pega uma dieta através do id da consulta.

    Query parameters:
        appointment_id: ID da consulta de um nutricionista.
    """

    data = request.GET

    # Data validation
    try: 
        consulta_id = Consulta.objects.get(id=data.get('appointment_id')).pk # Nesse caso, primary key == id
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={data.get('appointment_id')} não foi encontrada")
    
    try:
        relatorio_nutri = RelatorioNutricionista.objects.get(consulta=consulta_id)
    except RelatorioNutricionista.DoesNotExist:
        raise ParseError(f"Relatório referente à consulta com id={consulta_id} não foi encontrado")
    
    dieta_object = relatorio_nutri.dieta
    if not dieta_object:
        return Response({'message': f"Dieta da consulta com id={consulta_id} não foi encontrada"})
    
    resp = {
        'descricao_curta': dieta_object.descricao_curta,
        'descricao': dieta_object.descricao,
        'duracao_em_dias': dieta_object.duracao_em_dias,
        'calorias': dieta_object.calorias
    }

    return Response(resp)


@api_view(['POST'])
def salvaDieta(request: HttpRequest) -> Response:
    """
    Salva uma dieta receitada pelo nutricionista.

    Query parameters:
        consulta_id: ID da consulta em cujo relatório de nutricionista será dada a dieta.
        descricao_curta: Um resumo da dieta, como "Dieta de hipertrofia sem glúten"
        descricao: A descrição detalhada e completa da dieta
        duracao_em_dias: O tempo previsto para manter a dieta sem alterá-la
        calorias: A quantidade de calorias diárias da dieta, em kcal
    """

    body: dict = json.loads(request.body.decode('utf-8'))

    try:
        relatorio = RelatorioNutricionista.objects.filter(consulta__id=body.get('consulta_id')).first()
    except RelatorioNutricionista.DoesNotExist:
        raise ParseError(f"Relatório da requisição não foi encontrado")

    try:
        dieta_obj: Dieta = Dieta.objects.create(**{
            'descricao_curta': body.get('descricao_curta'),
            'descricao': body.get('descricao'),
            'duracao_em_dias': body.get('duracao_em_dias'),
            'calorias': body.get('calorias')
        })
    except:
        raise ParseError('Erro ao salvar dieta.')
    
    relatorio.dieta = dieta_obj # Associa dieta ao relatório de consulta correspondente à requisição
    relatorio.save()
    
    return Response({'dieta_id': dieta_obj.pk})