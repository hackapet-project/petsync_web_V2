from django.db import models #type: ignore
from api.models.shelter import Shelter
from .choices.animal_choices import ANIMAL_STATUS_CHOICES
from .generate_ulid import generate_ulid

class Animal(models.Model):
    STATUS = ANIMAL_STATUS_CHOICES
    animal_id = models.CharField(
        max_length=26,
        default=generate_ulid,
        editable=False,
        unique=True)
    shelter = models.ForeignKey(
        Shelter,
        on_delete=models.PROTECT,   # PROTECT evita borrar shelters con animales asociados
        related_name="animals",
    )
    status = models.CharField(
        max_length=20,
        choices=ANIMAL_STATUS_CHOICES,
        default='rescued'
    )

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    chip = models.CharField(max_length=15)