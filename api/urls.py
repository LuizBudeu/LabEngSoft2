
from django.urls import path, include

from .views.hello_world import hello_world
from .views.home import home
from .views.usuario import create as usuario_create

from .views.medico.consulta import consulta as medico_consulta
from .views.medico.consulta import comeca_consulta as medico_comeca_consulta
from .views.medico.medico import create_medico
from .views.medico.exame import pedir_exame as medico_pedir_exame
from .views.medico.exame import pegar_exames as medico_pegar_exames
from .views.medico.exame import finalizar_exame as medico_finalizar_exame
from .views.medico.agenda import agenda as medico_agenda
from .views.medico.agenda import consulta_paciente as medico_consulta_paciente
from .views.medico.medico import lista_profissionais as medico_lista_profissionais
from .views.medico.agenda import horarios_profissional as medico_horarios_profissional
from .views.medico.exame import exames_paciente as medico_exames_paciente
from .views.medico.medico import informacao_bancaria as medico_informacao_bancaria

from .views.paciente.perfil import create_profile as paciente_create
from .views.paciente.perfil import user_id as paciente_id
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
from .views.preparador.perfil import perfil as preparador_perfil
from .views.preparador.perfil import update_perfil as preparador_update_perfil
from .views.preparador.perfil import user_id as preparador_id
from .views.preparador.consulta import registrar_formulario
from .views.preparador.consulta import consulta_request
from .views.preparador.agenda import consulta_paciente as preparador_consulta_paciente
from .views.preparador.perfil import lista_profissionais as preparador_lista_profissionais
from .views.preparador.agenda import horarios_profissional as preparador_horarios_profissional
from .views.preparador.workout import treino_paciente as preparador_treino_paciente
from .views.preparador.perfil import informacao_bancaria as preparador_informacao_bancaria

from .views.nutricionista.agenda import agenda as nutricionista_agenda
from .views.nutricionista.avaliacao import avaliacao as avaliacao_nutricional
from .views.nutricionista.consulta import consulta as nutricionista_consulta
from .views.nutricionista.dieta import dieta
from .views.nutricionista.dieta import salvaDieta
from .views.nutricionista.dieta import salvaDieta
from .views.nutricionista.exame import pedirExame as nutricionista_exame
from .views.nutricionista.perfil import perfil as nutricionista_perfil
from .views.nutricionista.perfil import update_perfil as nutricionista_update_perfil
from .views.nutricionista.avaliacao import salvaAvaliacao as salva_avaliacao_nutricional
from .views.nutricionista.avaliacao import avaliacao as avaliacao_nutricional
from .views.nutricionista.agenda import consulta_paciente as nutricionista_consulta_paciente
from .views.nutricionista.perfil import lista_profissionais as nutricionista_lista_profissionais
from .views.nutricionista.agenda import horarios_profissional as nutricionista_horarios_profissional
from .views.nutricionista.dieta import dieta_paciente as nutricionista_dieta_paciente
from .views.nutricionista.dieta import exames_paciente as nutricionista_exames_paciente
from .views.nutricionista.perfil import informacao_bancaria as nutricionista_informacao_bancaria

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
    path('medico/consulta_paciente', medico_consulta_paciente, name='medico_consulta_paciente'),
    path('medico/lista_profissionais', medico_lista_profissionais, name='medico_lista_profissionais'),
    path('medico/horarios_profissional', medico_horarios_profissional, name='medico_horarios_profissional'),
    path('medico/exames_paciente', medico_exames_paciente, name='medico_exames_paciente'),
    path('medico/informacao_bancaria', medico_informacao_bancaria, name='medico_informacao_bancaria'),
    
    path('paciente/id', paciente_id, name='paciente_id'),
    path('paciente/create_profile', paciente_create, name='paciente_create'),
    path('paciente/agenda', paciente_agenda, name='paciente_agenda'),
    path('paciente/perfil', paciente_perfil, name='paciente_perfil'),
    path('paciente/update_perfil', paciente_update_perfil, name='paciente_update_perfil'),
    path('paciente/busca_profissionais', paciente_busca_profissionais, name='paciente_busca_profissionais'),
    path('paciente/horarios', paciente_horarios, name='paciente_horarios'),
    path('paciente/create_consulta', paciente_create_appointment, name='paciente_create_appointment'),
    path('paciente/cancel_consulta', paciente_cancel_appointment, name='paciente_cancel_appointment'),
    path('paciente/pay_consulta', paciente_pay_appointment, name='paciente_pay_appointment'),
    path('paciente/acompanhamento', paciente_acompanhamento, name='paciente_acompanhamento'),

    path('preparador/id', preparador_id, name='preparador_id'),
    path('preparador/agenda', preparador_agenda, name='preparador_agenda'),
    path('preparador/create_workout', workout_create, name='workout_create'),
    path('preparador/workouts', workouts, name='workouts'),
    path('preparador/perfil', preparador_perfil, name='preparador_perfil'),
    path('preparador/update_perfil', preparador_update_perfil, name='preparador_update_perfil'),
    path('preparador/consultas/<int:consulta_id>/formulario', registrar_formulario, name='finalizar_consulta'),
    path('preparador/consultas/<int:consulta_id>', consulta_request, name='consulta_request'),
    path('preparador/consulta_paciente', preparador_consulta_paciente, name='preparador_consulta_paciente'),
    path('preparador/lista_profissionais', preparador_lista_profissionais, name='preparador_lista_profissionais'),
    path('preparador/horarios_profissional', preparador_horarios_profissional, name='preparador_horarios_profissional'),
    path('preparador/treino_paciente', preparador_treino_paciente, name='preparador_treino_paciente'),
    path('preparador/informacao_bancaria', preparador_informacao_bancaria, name='preparador_informacao_bancaria'),

    path('nutricionista/agenda', nutricionista_agenda, name='nutricionista_agenda'),
    path('nutricionista/avaliacao', avaliacao_nutricional, name='avaliacao_nutricional'),
    path('nutricionista/consulta', nutricionista_consulta, name='nutricionista_consulta'),
    path('nutricionista/dieta', dieta, name='dieta'),
    path('nutricionista/salva_dieta', salvaDieta, name='salva_dieta'),
    path('nutricionista/exame', nutricionista_exame, name='nutricionista_exame'),
    path('nutricionista/avaliacao', avaliacao_nutricional, name='avaliacao_nutricional'),
    path('nutricionista/salva_avaliacao', salva_avaliacao_nutricional, name='salva_avaliacao_nutricional'),
    path('nutricionista/perfil', nutricionista_perfil, name='nutricionista_perfil'),
    path('nutricionista/update_perfil', nutricionista_update_perfil, name='nutricionista_update_perfil'),
    path('nutricionista/consulta_paciente', nutricionista_consulta_paciente, name='nutricionista_consulta_paciente'),
    path('nutricionista/lista_profissionais', nutricionista_lista_profissionais, name='nutricionista_lista_profissionais'),
    path('nutricionista/horarios_profissional', nutricionista_horarios_profissional, name='nutricionista_horarios_profissional'),
    path('nutricionista/dieta_paciente', nutricionista_dieta_paciente, name='nutricionista_dieta_paciente'),
    path('nutricionista/exames_paciente', nutricionista_exames_paciente, name='nutricionista_exames_paciente'),
    path('nutricionista/informacao_bancaria', nutricionista_informacao_bancaria, name='nutricionista_informacao_bancaria'),

    # path('logout/', views.LogoutView.as_view(), name ='logout')
]