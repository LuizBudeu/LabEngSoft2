
from django.urls import path, include

from .views.hello_world import hello_world
from .views.home import home
from .views.usuario import create as usuario_create
from .views.medico.agenda import agenda as medico_agenda
from .views.paciente.agenda import agenda as paciente_agenda
from .views.paciente.perfil import perfil as paciente_perfil
from .views.paciente.perfil import update_perfil as paciente_update_perfil
from .views.preparador.agenda import agenda as preparador_agenda
from .views.preparador.workout import workouts
from .views.preparador.workout import create as workout_create

urlpatterns = [
    path('hello-world/', hello_world, name='hello_world'),
    path('home/', home, name='home'),
    path('usuario/create/', usuario_create, name='usuario_create'),
    path('medico/agenda', medico_agenda, name='medico_agenda'),
    path('paciente/agenda', paciente_agenda, name='paciente_agenda'),
    path('paciente/perfil', paciente_perfil, name='paciente_perfil'),
    path('paciente/update_perfil', paciente_update_perfil, name='paciente_update_perfil'),
    path('preparador/agenda/', preparador_agenda, name='preparador_agenda'),
    path('preparador/create_workout/', workout_create, name='workout_create'),
    path('preparador/workouts', workouts, name='workouts'),
    
    # path('logout/', views.LogoutView.as_view(), name ='logout')
]