from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.http import HttpRequest

import json

from api.models import Consulta, Usuario, RelatorioNutricionista, AvaliacaoNutricional


@api_view(['GET'])
def avaliacao(request: HttpRequest) -> Response:
    """
    Pega uma Avaliação Nutricional através do ID da consulta em que a avaliação foi feita.

    Query parameters:
        consulta_id: ID da consulta correspondente ao relatório nutricional correspondente à Avaliação Nutricional procurada.
    """

    data = request.GET
    consulta_id = data.get('consulta_id')

    # Validação necessária
    try:
        consulta_obj = Consulta.objects.get(id=consulta_id)
        relatorio_obj = RelatorioNutricionista.objects.get(consulta=consulta_obj)
        avaliacao_obj = AvaliacaoNutricional.objects.get(relatorio_nutricionista=relatorio_obj)
    except Consulta.DoesNotExist:
        raise ParseError(f"Consulta com id={consulta_id} não foi encontrada.")
    except RelatorioNutricionista.DoesNotExist:
        raise ParseError(f"Consulta com id={consulta_id} não possui relatório, ainda.")
    except AvaliacaoNutricional.DoesNotExist:
        return Response({
            'avaliacao_existe': False,
            'message': 'Relatório da consulta não possui avaliação nutricional, ainda.'
        })
    
    return Response({
        'avaliacao_existe': True,
        'relatorio_nutricionista_id': avaliacao_obj.relatorio_nutricionista.pk,
        'paciente_id': avaliacao_obj.paciente.pk,
        'gosta': avaliacao_obj.gosta,
        'desgosta': avaliacao_obj.desgosta,
        'alergias': avaliacao_obj.alergias,
        'doencas': avaliacao_obj.doencas,
        'objetivo': avaliacao_obj.objetivo
    })


@api_view(['POST'])
def salvaAvaliacao(request: HttpRequest) -> Response:
    """
    Salva uma Avaliação Nutricional realizada pelo nutricionista.

    Query parameters:
        relatorio_id: ID do relatório da consulta na qual foi feita a avaliação.
        paciente_id: ID de usuário do paciente avaliado.
        gosta: Alimentos que o paciente gosta, e então têm mais chances de ser inclusos em dietas.
        desgosta: Alimentos que o paciente não gosta, e não serão inclusos em dietas.
        alergias: Alergias do paciente relevantes para o nutricionista.
        doencas: Doenças do paciente que são relevantes para o nutricionista.
        objetivo: Objetivo visado pelo paciente, como emagrecer, ganhar massa muscular, etc.
    """

    body: dict = json.loads(request.body.decode('utf-8'))

    # Validação de IDs
    try:
        relatorio_obj = RelatorioNutricionista.objects.get(id=body.get('relatorio_id'))
        paciente_obj = Usuario.objects.get(id=body.get('paciente_id'))
    except RelatorioNutricionista.DoesNotExist:
        raise ParseError(f"Não foi possível encontrar relatório com id={body.get('relatorio_id')}")
    except Usuario.DoesNotExist:
        raise ParseError(f"Não foi possível encontrar paciente com id={body.get('paciente_id')}")
    except Exception as e:
        raise ParseError(f"Erro: {e}")
    
    try:
        avaliacao_obj = AvaliacaoNutricional.objects.create(
            relatorio_nutricionista = relatorio_obj,
            paciente = paciente_obj,
            gosta = body.get('gosta'),
            desgosta = body.get('desgosta'),
            alergias = body.get('alergias'),
            doencas = body.get('doencas'),
            objetivo = body.get('objetivo')
        )
    except Exception as e:
        raise ParseError(f'Erro ao criar registro da Avaliação Nutricional: {e}')
    
    return Response({'avaliacao_id': avaliacao_obj.pk})