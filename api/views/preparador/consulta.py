from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest
import json

from api.models import Consulta
from api.models import TreinoFisico
from api.models import RelatorioPreparadorFisico
from api.models import Usuario

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

@api_view(['GET','PATCH'])
def consulta_request(request: HttpRequest, consulta_id) -> Response:
    if request.method == 'GET':
        return informacoes_usuario(consulta_id)
    else:
        return finalizar_consulta(consulta_id)


mockInfo_UserNutrion = {'dieta': 'Consome 2500 kcal', 'detalhes_adicionais': 'Não consegue comer farinha'}
mockInfo_UserMedical = {'alergias': 'Amendoim', 'tipo_diabetes': '0'}

def informacoes_usuario(consulta_id) -> Response:
    mockResponse = {
        'medical': mockInfo_UserMedical,
        'nutrition': mockInfo_UserNutrion
    }
    return Response(mockResponse)


def finalizar_consulta (consulta_id) -> Response:
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

@api_view(['GET'])
def informacoes_fisicas_paciente(request: HttpRequest) -> Response:
    """
    Fornece informações do contexto do preparador físico
    que sejam úteis para outros tipos de profissionais

    query params:
        - user_id: id do usuário que se busca as informações
    """
    user_id = request.GET['user_id']

    try:
        usuario = Usuario.objects.get(id=user_id)
    except:
        raise ParseError(f"Usuário com id={user_id} não encontrado")   
    
    try:
        relatorio = RelatorioPreparadorFisico.objects.filter(
            consulta__paciente_id=user_id,
        ).values().order_by('-created_at').first()

    except:
        raise ParseError(f"O Usuário com id={user_id} não posssui relatórios de preparadores físicos")

    return Response({
        'nivel_de_atividade_fisica': relatorio['nivel_de_atividade_fisica'],
        'porcentagem_de_gordura': relatorio['porcentagem_de_gordura'],
        'porcentage_de_musculo': relatorio['porcentagem_de_gordura']
    })