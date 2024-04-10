from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.exceptions import ParseError
from rest_framework.parsers import JSONParser
import json

from api.models import Consulta, Usuario, Medico, RelatorioMedico


@api_view(['POST'])
def registrar_formulario(request: HttpRequest, consulta_id) -> Response:
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
        raise ParseError(f"Consulta com id={body['user_id']} não encontrada")

    try:
        relatorio = RelatorioMedico(
            consulta=consulta,
            massa=body["massa"],
            altura=body["altura"],
            nivel_de_acucar_no_sangue=body["nivel_de_acucar_no_sangue"],
            gordura_no_figado=body["gordura_no_figado"],
            hemoglobina_glicada=body["hemoglobina_glicada"],
            producao_de_insulina=body["producao_de_insulina"]
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


#
# @api_view(['GET'])
# def consulta(request: HttpRequest):
#
#     return Response({'message': 'Connected.'})
#
#
# @api_view(http_method_names=['POST'])
# def comeca_consulta(request: HttpRequest):
#     """
#     Começa uma consulta médica.
#     """
#
#     data = request.POST
#
#     try:
#         paciente = Usuario.objects.get(id=data.get('paciente'))
#         profissional = Usuario.objects.get(id=data.get('profissional'))
#         consulta = Consulta.objects.create(
#             paciente=paciente,
#             profissional=profissional,
#             horario=data.get('horario'),
#             status=4,  # Pendente
#         )
#     except Exception as e:
#         raise ParseError(f"Erro ao criar consulta: {e}")
#
#     return Response({'message': f"Consulta {consulta.id} criada."})
#
#
# @api_view(http_method_names=['PUT'])
# def finaliza_consulta(request: HttpRequest):
#     """
#     Finaliza uma consulta médica.
#     """
#
#     data = JSONParser().parse(request)
#
#     try:
#         consulta = Consulta.objects.get(id=data.get('consulta_id'))
#         consulta.status = 2  # Realizada
#         consulta.save()
#     except Exception as e:
#         raise ParseError(f"Erro ao criar consulta: {e}")
#
#     return Response({'message': f"Consulta {consulta.id} finalizada."})
#
#
# @api_view(['POST'])
# def salva_relatorio(request: HttpRequest):
#     """
#     Salva um relatório médico.
#     """
#
#     return Response({'message': 'Connected.'})