from math import radians, cos, sin, asin, sqrt


def calculate_distance(lat, lng, station):
    lon1, lat1, lon2, lat2 = map(
        radians, [lng, lat, float(station.longitude), float(station.latitude)])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    km = 6371 * c
    return km
