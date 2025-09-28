from django.contrib.auth.hashers import make_password #type: ignore
from rest_framework import serializers #type: ignore
from api.models.user import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_id', 'name', 'email', 'password',
            'is_active', 'created_at','shelter',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
            model = User
            fields = ['name', 'email', 'password', 'confirm_password', 'shelter']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data.pop('password'))
        return User.objects.create(**validated_data)
