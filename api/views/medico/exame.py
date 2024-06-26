from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from datetime import datetime, date

from django.http import HttpRequest
import json

from api.models import PedidoExameMedico
from api.models import Usuario


@api_view(http_method_names=['POST'])
def pedir_exame(request: HttpRequest):
    """
    Cria um pedido de exame médico para um paciente.
    Body parameters:
        paciente_id: ID usuário do paciente
        medico_id: ID usuário do médico
        titulo: Título do exame
    """

    data = json.loads(request.body.decode('utf-8'))

    print(data)

    try:
        paciente = Usuario.objects.get(id=data.get('paciente_id'))
        medico = Usuario.objects.get(id=data.get('medico_id'))

        pedido_exame = PedidoExameMedico.objects.create(
            paciente=paciente,
            medico=medico,
            titulo=data.get('titulo'),
            status=0,  # Pendente
        )
    except Exception as e:
        raise ParseError(f"Erro ao criar pedido de exame: {e}")

    return Response({'message': f"Pedido de exame médico {pedido_exame.id} criado."})


@api_view(http_method_names=['PUT'])
def finalizar_exame(request: HttpRequest):
    """
    Finaliza um pedido de exame médico de um paciente.
    Body parameters:
        exame_id: ID do exame
    """

    data = request.data

    try:
        exame = PedidoExameMedico.objects.get(id=data.get('exame_id'))
        exame.status = 1  # Finalizada
        exame.save()
    except Exception as e:
        raise ParseError(f"Erro ao finalizar exame: {e}")

    return Response({'message': f"Exame {exame.id} finalizado."})


@api_view(['GET'])
def pegar_exames(request: HttpRequest) -> Response:
    """
    Pega os pedidos de exames de um médico. Retorna todas os pedidos de exames
    criados a partir de start_date.

    Query parameters:
        user_id: ID usuário do médico
        start_date: pega exames só de hoje
        status: status do exame
    """

    data = request.GET

    # Validations
    try:
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d') if data.get('start_date') else date.today()
    except ValueError:
        raise ParseError('Datas inical e final precisam estar no formato YYYY-mm-dd')

    try:
        usuario = Usuario.objects.get(id=data.get('user_id'))
    except Usuario.DoesNotExist:
        raise ParseError(f"Usuário com id={data.get('user_id')} não foi encontrado")

    status = data.get('status')

    pedidosExames = PedidoExameMedico.objects.filter(
        medico=usuario,
        created_at__gte=start_date
    )

    if status:
        pedidosExames = pedidosExames.filter(status=status)

    pedidosExames = pedidosExames.values(
        'id',
        'titulo',
        'created_at',
        'paciente__nome',
        'status'
    )

    return Response(pedidosExames)


@api_view(['GET'])
def exames_paciente(request):
    """
    Retorna os exames abertos do usuário.

    Query parameters:
        user_id: ID usuário do paciente
    """

    data = request.GET

    examesMedicos = PedidoExameMedico.objects.filter(
        paciente_id=data['user_id'],
        status=0
    ).values(
        'medico_id',
        'medico__ocupacao',
        'medico__nome',
        'medico__logradouro',
        'medico__numero',
        'medico__complemento',
        'titulo',
    ).order_by('-created_at')

    return Response(examesMedicos)
