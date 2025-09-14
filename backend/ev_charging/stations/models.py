
from django.db import models
from django.conf import settings


class Station(models.Model):
    operator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'operator'}
    )
    name = models.CharField(max_length=200)
    address = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    total_charging_points = models.PositiveIntegerField(default=0)
    occupied_charging_points = models.PositiveIntegerField(default=0)
    cost_per_kwh = models.DecimalField(max_digits=6, decimal_places=2)
    power_kw = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name


class Rating(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'user'}
    )
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, related_name='ratings')
    score = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'station')
