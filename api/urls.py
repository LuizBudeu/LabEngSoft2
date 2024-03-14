
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

from .views.hello_world import hello_world
from .views.home import home
from .views.usuario import create as usuario_create
from .views.medico.agenda import agenda as medico_agenda
from .views.medico.consulta import consulta as medico_consulta
from .views.medico.consulta import comeca_consulta as medico_comeca_consulta
from .views.paciente.perfil import perfil as paciente_perfil
from .views.medico.medico import create_medico
from .views.paciente.perfil import update_perfil as paciente_update_perfil

urlpatterns = [
    path('hello-world/', hello_world, name='hello_world'),
    path('home/', home, name='home'),
    path('usuario/create/', usuario_create, name='usuario_create'),
    path('medico/agenda', medico_agenda, name='medico_agenda'),
    path('medico/consulta', medico_consulta, name='medico_consulta'),
    path('medico/comeca_consulta', medico_comeca_consulta, name='medico_comeca_consulta'),

    path('medico/create', create_medico, name='medico_create'),
    
    path('paciente/perfil', paciente_perfil, name='paciente_perfil'),
    path('paciente/update_perfil', paciente_update_perfil, name='paciente_update_perfil'),

    path('token/',  
        jwt_views.TokenObtainPairView.as_view(), 
        name ='token_obtain_pair'), 
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),
    # path('logout/', views.LogoutView.as_view(), name ='logout')
]