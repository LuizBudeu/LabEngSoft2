
from django.urls import path, include

from .views.hello_world import hello_world
from .views.home import home
from .views.usuario import create as usuario_create

from .views.medico.consulta import consulta as medico_consulta
from .views.medico.consulta import comeca_consulta as medico_comeca_consulta
from .views.medico.medico import create_medico
from .views.medico.exame import pedir_exames as medico_pedir_exame
from .views.medico.exame import pegar_exames as medico_pegar_exames
from .views.medico.exame import finalizar_exame as medico_finalizar_exame
from .views.medico.agenda import agenda as medico_agenda

from .views.paciente.perfil import update_perfil as paciente_update_perfil
from .views.paciente.busca import buscaProfissionais as paciente_busca_profissionais
from .views.paciente.busca import horarios as paciente_horarios
from .views.paciente.agenda import createAppointment as paciente_create_appointment
from .views.paciente.agenda import cancelAppointment as paciente_cancel_appointment
from .views.paciente.agenda import payAppointment as paciente_pay_appointment
from .views.paciente.acompanhamento import acompanhamento as paciente_acompanhamento
from .views.paciente.perfil import perfil as paciente_perfil
from .views.paciente.agenda import agenda as paciente_agenda

from .views.preparador.agenda import agenda as preparador_agenda
from .views.preparador.workout import workouts
from .views.preparador.workout import create as workout_create

from .views.nutricionista.agenda import agenda as nutricionista_agenda
from .views.nutricionista.avaliacao import avaliacao as avaliacao_nutricional
from .views.nutricionista.consulta import consulta as nutricionista_consulta
from .views.nutricionista.dieta import dieta
from .views.nutricionista.exame import pedirExame as nutricionista_exame
from .views.nutricionista.perfil import perfil as nutricionista_perfil
from .views.nutricionista.perfil import update_perfil as nutricionista_update_perfil
from .views.preparador.consulta import registrar_formulario
from .views.preparador.consulta import consulta_request

urlpatterns = [
    path('hello-world', hello_world, name='hello_world'),
    path('home', home, name='home'),
    path('usuario/create', usuario_create, name='usuario_create'),
    
    path('medico/agenda', medico_agenda, name='medico_agenda'),
    path('medico/consulta', medico_consulta, name='medico_consulta'),
    path('medico/comeca_consulta', medico_comeca_consulta, name='medico_comeca_consulta'),
    path('medico/pedir_exame', medico_pedir_exame, name='medico_pedir_exame'),
    path('medico/pegar_exames', medico_pegar_exames, name='medico_pegar_exames'),
    path('medico/finalizar_exame', medico_finalizar_exame, name='medico_finalizar_exame'),
    path('medico/create', create_medico, name='medico_create'),
    
    path('paciente/agenda', paciente_agenda, name='paciente_agenda'),
    path('paciente/perfil', paciente_perfil, name='paciente_perfil'),
    path('paciente/update_perfil', paciente_update_perfil, name='paciente_update_perfil'),
    path('paciente/busca_profissionais', paciente_busca_profissionais, name='paciente_busca_profissionais'),
    path('paciente/horarios', paciente_horarios, name='paciente_horarios'),
    path('paciente/create_consulta', paciente_create_appointment, name='paciente_create_appointment'),
    path('paciente/cancel_consulta', paciente_cancel_appointment, name='paciente_cancel_appointment'),
    path('paciente/pay_consulta', paciente_pay_appointment, name='paciente_pay_appointment'),
    path('paciente/acompanhamento', paciente_acompanhamento, name='paciente_acompanhamento'),

    path('preparador/agenda', preparador_agenda, name='preparador_agenda'),
    path('preparador/create_workout', workout_create, name='workout_create'),
    path('preparador/workouts', workouts, name='workouts'),
    path('preparador/consultas/<int:consulta_id>/formulario', registrar_formulario, name='finalizar_consulta'),
    path('preparador/consultas/<int:consulta_id>', consulta_request, name='consulta_request'),

    path('nutricionista/agenda', nutricionista_agenda, name='nutricionista_agenda'),
    path('nutricionista/avaliacao', avaliacao_nutricional, name='avaliacao_nutricional'),
    path('nutricionista/consulta', nutricionista_consulta, name='nutricionista_consulta'),
    path('nutricionista/dieta', dieta, name='dieta'),
    path('nutricionista/exame', nutricionista_exame, name='nutricionista_exame'),
    path('nutricionista/perfil', nutricionista_perfil, name='nutricionista_perfil'),
    path('nutricionista/update_perfil', nutricionista_update_perfil, name='nutricionista_update_perfil'),

    # path('logout/', views.LogoutView.as_view(), name ='logout')
]