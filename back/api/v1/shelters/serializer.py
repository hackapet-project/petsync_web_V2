from rest_framework import serializers #type: ignore
from api.models.shelter import Shelter

class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = ["shelter_id", "name", "country", "created_at", "updated_at", "is_active"]
        read_only_fields = ["shelter_id", "created_at", "updated_at"]
