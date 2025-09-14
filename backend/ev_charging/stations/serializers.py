from rest_framework import serializers
from .models import Station, Rating


class StationSerializer(serializers.ModelSerializer):
    available_charging_points = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Station
        fields = '__all__'

    def get_available_charging_points(self, obj):
        return obj.total_charging_points - obj.occupied_charging_points

    def get_location(self, obj):
        return {'latitude': float(obj.latitude), 'longitude': float(obj.longitude)}


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
        read_only_fields = ('user', 'station')
