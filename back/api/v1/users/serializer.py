from django.contrib.auth.password_validation import validate_password  # type: ignore
from rest_framework import serializers #type: ignore
from api.models.user import User
from api.models.shelter import Shelter

class UserSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        read_only=True,
        slug_field='shelter_id',
    )
    shelter_name = serializers.CharField(source='shelter.name', read_only=True)

    class Meta:
        model = User
        fields = [
            'user_id', 'name', 'email', 'password',
            'is_active', 'created_at', 'shelter', 'shelter_name',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        queryset=Shelter.objects.all(),
        slug_field='shelter_id',
        allow_null=True,
        required=False,
    )

    class Meta:
        model = User
        fields = [
            'name',
            'email',
            'is_active',
            'shelter',
            'position',
            'role',
        ]

    def validate_email(self, value):
        normalized_email = User.objects.normalize_email(value).strip()
        queryset = User.objects.filter(email__iexact=normalized_email)

        if self.instance is not None:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Email already in use")

        return normalized_email

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    shelter = serializers.SlugRelatedField(
        queryset=Shelter.objects.all(),
        slug_field='shelter_id',
        allow_null=True,
        required=False,
    )

    class Meta:
            model = User
            fields = ['name', 'email', 'password', 'confirm_password', 'shelter']

    def validate_email(self, value):
        normalized_email = User.objects.normalize_email(value).strip()
        if User.objects.filter(email__iexact=normalized_email).exists():
            raise serializers.ValidationError("Email already in use")
        return normalized_email

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match"})

        user = User(
            name=data.get('name', ''),
            email=data.get('email', ''),
            shelter=data.get('shelter'),
        )
        validate_password(data['password'], user=user)
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        return User.objects.create_user(password=password, **validated_data)
