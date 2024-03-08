
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

from .views.hello_world import hello_world
from .views.home import home
from .views.usuario import create as usuario_create
from .views.medico.agenda import agenda as medico_agenda


urlpatterns = [
    path('hello-world/', hello_world, name='hello_world'),
    path('home/', home, name='home'),
    path('usuario/create/', usuario_create, name='usuario_create'),
    path('medico/agenda', medico_agenda, name='medico_agenda'),

    path('token/',  
        jwt_views.TokenObtainPairView.as_view(), 
        name ='token_obtain_pair'), 
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),
    # path('logout/', views.LogoutView.as_view(), name ='logout')
]