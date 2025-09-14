from django.urls import path
from .views import (
    StationListView, StationDetailView, OperatorStationCreateView,
    OperatorStationUpdateDeleteView, StaffStationListView, RatingCreateView
)

urlpatterns = [
    path('', StationListView.as_view(), name='station-list'),
    path('<int:pk>/', StationDetailView.as_view(), name='station-detail'),
    path('operator/create/', OperatorStationCreateView.as_view(),
         name='operator-create-station'),
    path('operator/<int:pk>/', OperatorStationUpdateDeleteView.as_view(),
         name='operator-update-delete-station'),
    path('staff/list/', StaffStationListView.as_view(), name='staff-station-list'),
    path('rate/', RatingCreateView.as_view(), name='station-rate'),
]
