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
    microchipped = models.BooleanField(default=False)
    birth_date = models.DateField(null=True, blank=True)
    intake_date = models.DateField()
    outcome_date = models.DateField(null=True, blank=True)
    species = models.CharField(max_length=50, choices=[('dog', 'Dog'), ('cat', 'Cat'), ('other', 'Other')])
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('unknown', 'Unknown')])
    size = models.CharField(max_length=20, choices=[('small', 'Small'), ('medium', 'Medium'), ('large', 'Large')], blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    sterilized = models.BooleanField(default=False)
    vaccinated = models.BooleanField(default=False)
    medical_notes = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    last_vet_visit = models.DateField(null=True, blank=True)

    temperament = models.CharField(max_length=200, blank=True)  # Ej: "Calm, friendly with kids"
    # good_with_dogs = models.BooleanField(default=False)
    # good_with_cats = models.BooleanField(default=False)
    # good_with_children = models.BooleanField(default=False)
    behavior_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
