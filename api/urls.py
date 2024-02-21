
from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('home/', views.home, name ='home'),
    path('token/', 
        jwt_views.TokenObtainPairView.as_view(), 
        name ='token_obtain_pair'),
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),
    # path('logout/', views.LogoutView.as_view(), name ='logout')
]