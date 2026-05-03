from rest_framework import serializers  # type: ignore

from api.models.animal import Animal
from api.models.shelter import Shelter


class AnimalSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="animal_id", read_only=True)
    shelter_id = serializers.CharField(source="shelter.shelter_id", read_only=True)

    class Meta:
        model = Animal
        fields = [
            "id",
            "shelter_id",
            "status",
            "name",
            "breed",
            "chip",
            "birth_date",
            "intake_date",
            "outcome_date",
            "species",
            "gender",
            "size",
            "weight",
            "microchipped",
            "sterilized",
            "vaccinated",
            "medical_notes",
            "allergies",
            "last_vet_visit",
            "temperament",
            "behavior_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields


class AnimalWriteSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        queryset=Shelter.objects.all(),
        slug_field="shelter_id",
    )

    class Meta:
        model = Animal
        fields = [
            "shelter",
            "status",
            "name",
            "breed",
            "chip",
            "birth_date",
            "intake_date",
            "outcome_date",
            "species",
            "gender",
            "size",
            "weight",
            "microchipped",
            "sterilized",
            "vaccinated",
            "medical_notes",
            "allergies",
            "last_vet_visit",
            "temperament",
            "behavior_notes",
        ]
