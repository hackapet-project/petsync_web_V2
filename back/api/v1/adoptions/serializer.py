from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import Adoption
from api.models.animal import Animal

User = get_user_model()


class AdoptionSerializer(serializers.ModelSerializer):
    animal = serializers.SlugRelatedField(
        slug_field="animal_id",
        read_only=True,
    )
    # Expose the responsable's public ULID instead of the internal PK
    responsable_id = serializers.SlugRelatedField(
        source="responsable",
        slug_field="user_id",
        read_only=True,
    )

    class Meta:
        model  = Adoption
        fields = [
            "adoption_id",
            "animal",
            "responsable_id",
            "adoptant_name",
            "adoptant_email",
            "state",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["adoption_id", "created_at", "updated_at"]


class AdoptionCreateSerializer(serializers.ModelSerializer):
    animal = serializers.SlugRelatedField(
        slug_field="animal_id",
        queryset=Animal.objects.all(),
    )
    adoptant = serializers.SlugRelatedField(
        slug_field="user_id",
        queryset=User.objects.all(),
        write_only=True,
    )
    responsable = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model  = Adoption
        fields = ["animal", "responsable", "adoptant"]

    def validate_responsable(self, user):
        if user.role not in (User.Roles.ADMIN, User.Roles.MODERATOR):
            raise serializers.ValidationError(
                "The assigned responsable must have an ADMIN or MODERATOR role."
            )
        return user

    def create(self, validated_data):
        adoptant = validated_data.pop("adoptant")
        validated_data["adoptant_name"] = adoptant.name
        validated_data["adoptant_email"] = adoptant.email
        return super().create(validated_data)


class AdoptionStateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Adoption
        fields = ["state", "notes"]
