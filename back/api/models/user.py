from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin #type: ignore
from django.db import models #type: ignore
from .shelter import Shelter
from .generate_ulid import generate_ulid

import json

# def generate_ulid():
#     return str(ulid.ULID())

class UserQuerySet(models.QuerySet):
    def for_user(self, u):
        role = getattr(u, "role", None)

        if role == 'ADMIN':
            return self.all()

        if role == 'MODERATOR':
            return self.filter(shelter=u.shelter)

        return self.none()

class CustomUserManager(BaseUserManager.from_queryset(UserQuerySet)):
    user_in_migrations = True

    def create_user(self, email, shelter, password=None, name=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        if shelter is None:
            raise ValueError("Users must belong to a shelter")

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            shelter=shelter,
            **extra_fields)
        user.set_password(password)  # This hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, shelter, name=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        extra_fields.setdefault("role", "ADMIN")

        return self.create_user(
            email=email,
            password=password,
            shelter=shelter, **extra_fields)

class User(AbstractBaseUser):
    user_id = models.CharField(max_length=26, default=generate_ulid, editable=False, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    shelter = models.ForeignKey(
        Shelter,
        on_delete=models.PROTECT,   # PROTECT evita borrar shelters con usuarios asociados
        related_name="users",
        null=True, blank=True       # si quieres permitir superusers sin shelter
    )

    # shelter = models.CharField(max_length=255, null=True, blank=True)
    position = models.CharField(max_length=255, null=True, blank=True)

    # summary = models.TextField(null=True, blank=True)
    # description = models.CharField(max_length=255, null=True, blank=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Roles(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MODERATOR = "MODERATOR", "Moderator"
        USER = "USER", "User"
    role = models.CharField(max_length=16, choices=Roles.choices, default=Roles.USER)

    def __str__(self):
        return json.dumps({
            'user_id': self.user_id,
            'shelter_id': self.shelter.shelter_id,
            'name': self.name,
            'email': self.email,
        })