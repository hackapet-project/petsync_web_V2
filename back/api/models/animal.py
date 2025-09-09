from django.db import models #type: ignore
import generate_ulid
from choices.animal_choices import ANIMAL_STATUS_CHOICES

class Animal(models.Model):
    STATUS = ANIMAL_STATUS_CHOICES
    animal_id = models.CharField(
        max_length=26,
        default=generate_ulid,
        editable=False,
        unique=True)

    status = models.CharField(
        max_length=20,
        choices=ANIMAL_STATUS_CHOICES,
        default='rescued'
    )

    name = models.CharField(max_lenght=100)
    breed = models.CharField(max_length=100)
    chip = models.CharField(max_length=15)