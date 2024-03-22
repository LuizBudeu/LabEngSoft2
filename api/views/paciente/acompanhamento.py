from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Usuario, RelatorioNutricionista, RelatorioPreparadorFisico, PedidoExameMedico


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

    # TODO: Add title
    treino = RelatorioPreparadorFisico.objects.filter(
        consulta__paciente=usuario,
    ).values(
        'consulta__profissional__nome',
        'treino_fisico__treino',
    ).order_by('-created_at').first()

    examesMedicos = PedidoExameMedico.objects.filter(
        paciente=usuario,
        status=0
    ).values(
        'medico__nome',
        'titulo',
    ).order_by('-created_at')

    # TODO: Add Exame nutricionista
    # examesNutricionista = PedidoExameNutricionista.objects.filter(
    #     paciente=usuario,
    #     status=0
    # ).values(
    #     'tipo_exame',
    # ).order_by('-created_at')

    examesNutricionista = [{
        "Nutricionista__nome": "Adevaldo Rodrigues",
        "tipo_exame": "Exame de sangue"
    },
    {
        "Nutricionista__nome": "Sara Penha",
        "tipo_exame": "Hemograma"
    }]


    return Response({
        "dieta": dieta,
        "treino": treino,
        "examesMedico": examesMedicos,
        "examesNutricionista": examesNutricionista
    })