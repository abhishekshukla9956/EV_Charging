from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, CurrentUserView, UpdateCurrentUserView, UpdateLocationView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="accounts-register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="accounts-me"),
    path("me/update/", UpdateCurrentUserView.as_view(), name="accounts-me-update"),
    path("me/location/", UpdateLocationView.as_view(), name="update-location"),

]
