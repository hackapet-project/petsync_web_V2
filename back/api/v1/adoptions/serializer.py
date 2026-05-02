from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Adoption

User = get_user_model()


class AdoptionSerializer(serializers.ModelSerializer):
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
    # Front sends the responsable's ULID (user_id), not the DB pk
    responsable = serializers.SlugRelatedField(
        slug_field="user_id",
        queryset=User.objects.filter(role__in=["ADMIN", "MODERATOR"]),
    )

    class Meta:
        model  = Adoption
        fields = ["animal", "responsable", "adoptant_name", "adoptant_email"]

    def validate_responsable(self, user):
        if user.role not in (User.Roles.ADMIN, User.Roles.MODERATOR):
            raise serializers.ValidationError(
                "The assigned responsable must have an ADMIN or MODERATOR role."
            )
        return user


class AdoptionStateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Adoption
        fields = ["state", "notes"]