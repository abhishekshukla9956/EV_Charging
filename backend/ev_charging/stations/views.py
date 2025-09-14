from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Station, Rating
from .serializers import StationSerializer, RatingSerializer
from .permissions import IsOperator, IsStaffOrAdmin
from .utils import calculate_distance
from django.db.models import F


class StationListView(generics.ListAPIView):
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Station.objects.all()
        user_lat = self.request.query_params.get('latitude')
        user_lng = self.request.query_params.get('longitude')
        if user_lat and user_lng:
            user_lat, user_lng = float(user_lat), float(user_lng)
            queryset = sorted(
                queryset, key=lambda s: calculate_distance(user_lat, user_lng, s))
        return queryset


class StationDetailView(generics.RetrieveAPIView):
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Station.objects.all()


class OperatorStationCreateView(generics.CreateAPIView):
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticated, IsOperator]

    def perform_create(self, serializer):
        serializer.save(operator=self.request.user)


class OperatorStationUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticated, IsOperator]

    def get_queryset(self):
        return Station.objects.filter(operator=self.request.user)


class StaffStationListView(generics.ListAPIView):
    serializer_class = StationSerializer
    permission_classes = [IsAuthenticated, IsStaffOrAdmin]
    queryset = Station.objects.all()


class RatingCreateView(generics.CreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        station_id = self.request.data.get('station')
        station = get_object_or_404(Station, id=station_id)
        serializer.save(user=self.request.user, station=station)
