from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from api.models import Usuario, RelatorioNutricionista, RelatorioPreparadorFisico, PedidoExameMedico, PedidoExameNutricionista


@api_view(['GET'])
def acompanhamento(request):
    """
    Lista de acomapanhamentos de um paciente. Apresenta a dieta e treino mais recente e os exames em aberto.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    try: 
        usuario = Usuario.objects.get(id=data['user_id'])
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data['user_id']} não foi encontrado")

    dieta = RelatorioNutricionista.objects.filter(
        consulta__paciente=usuario,
    ).values(
        'consulta__profissional__nome',
        'dieta__descricao_curta',
        'dieta__descricao',
        'dieta__duracao_em_dias',
        'dieta__calorias',
    ).order_by('-created_at').first()

    treino = RelatorioPreparadorFisico.objects.filter(
        consulta__paciente=usuario,
    ).values(
        'consulta__profissional__nome',
        'treino_fisico__treino',
        'treino_fisico__titulo',
    ).order_by('-created_at').first()

    examesMedicos = PedidoExameMedico.objects.filter(
        paciente=usuario,
        status=0
    ).values(
        'medico_id',
        'medico__nome',
        'medico__logradouro',
        'medico__numero',
        'medico__complemento',
        'titulo',
    ).order_by('-created_at')

    examesNutricionista = PedidoExameNutricionista.objects.filter(
        paciente=usuario,
        status=0
    ).values(
        'nutricionista_id',
        'nutricionista__nome',
        'nutricionista__logradouro',
        'nutricionista__numero',
        'nutricionista__complemento',
        'tipo_exame',
    ).order_by('-created_at')


    return Response({
        "dieta": dieta,
        "treino": treino,
        "examesMedico": examesMedicos,
        "examesNutricionista": examesNutricionista
    })