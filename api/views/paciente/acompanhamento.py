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
    treino['treino_fisico__title'] = "teste title"

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

    # TODO: Add Exame nutricionista
    # examesNutricionista = PedidoExameNutricionista.objects.filter(
    #     paciente=usuario,
    #     status=0
    # ).values(
        # 'Nutricionista_id',
        # 'Nutricionista__nome',
        # 'Nutricionista__logradouro',
        # 'Nutricionista__numero',
        # 'Nutricionista__complemento',
    #     'tipo_exame',
    # ).order_by('-created_at')

    examesNutricionista = [{
        'Nutricionista_id': 3,
        "Nutricionista__nome": "Adevaldo Rodrigues",
        'Nutricionista__logradouro': "Rua do Anjos",
        'Nutricionista__numero': "203",
        'Nutricionista__complemento': "Apt 44",
        "tipo_exame": "Exame de sangue"
    },
    {
        'Nutricionista_id': 3,
        "Nutricionista__nome": "Sara Penha",
        'Nutricionista__logradouro': "Rua do Amores",
        'Nutricionista__numero': "12022",
        'Nutricionista__complemento': "Bloco 6",
        "tipo_exame": "Hemograma"
    }]


    return Response({
        "dieta": dieta,
        "treino": treino,
        "examesMedico": examesMedicos,
        "examesNutricionista": examesNutricionista
    })