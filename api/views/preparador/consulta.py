from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json

from api.models import Consulta
from api.models import TreinoFisico
from api.models import RelatorioPreparadorFisico

@api_view(['POST'])
def registrar_formulario (request: HttpRequest, consulta_id) -> Response:
    """
    Cria um novo objeto de Relatório do preparador físico.

    Body da requisição:
        treino_id, altura, massa, nivel_de_atividade_fisica,
        porcentagem_de_gordura, porcentage_de_musculo, metabolismo_basal,
        gasto_calorico, treino_fisico

    """
    
    body = json.loads(request.body.decode('utf-8'))
    
    try:
        consulta = Consulta.objects.get(id=consulta_id)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={body['user-id']} não encontrada")
    
    try:
        treino = TreinoFisico.objects.get(id=body['treino_fisico'])
    except Consulta.DoesNotExist:
        raise ParseError(f"Treino com id={consulta_id} não encontrado")

    try:
        relatorio = RelatorioPreparadorFisico(
            consulta=consulta,
            treino_fisico=treino,
            massa=body["massa"],
            altura=body["altura"],
            nivel_de_atividade_fisica=body["nivel_de_atividade_fisica"],
            gasto_calorico=body["gasto_calorico"],
            metabolismo_basal=body["metabolismo_basal"],
            porcentagem_de_gordura=body["porcentagem_de_gordura"],
            porcentage_de_musculo=body["porcentage_de_musculo"]
        )
        relatorio.save()
    except:
        raise ParseError(f"Ocorreu um erro durante a criação do relatório.")
    
    return Response("Formulario registrado")

@api_view(['PATCH'])
def finalizar_consulta (request: HttpRequest, consulta_id) -> Response:
    """
    Atualiza o status da consulta para "Realizada"

    Path parms:
        consulta_id: id da consulta a ser finalizada
    """
    try:
        consulta = Consulta.objects.get(id=consulta_id)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={consulta_id} não encontrada")

    consulta.status = 2
    consulta.save()

    return Response("Consulta finalizada")