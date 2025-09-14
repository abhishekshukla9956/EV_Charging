from .views import RegisterView, CustomTokenObtainPairView, CurrentUserView, LoginView
from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, CurrentUserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="accounts-register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="accounts-me"),
]

urlpatterns = [
    path("register/", RegisterView.as_view(), name="accounts-register"),
    path("login/", LoginView.as_view(), name="accounts-login"),
    path("jwt/login/", CustomTokenObtainPairView.as_view(),
         name="accounts-jwt-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="accounts-me"),
]
