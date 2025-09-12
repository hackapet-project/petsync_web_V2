from django.db import models #type: ignore
# from django_countries.fields import CountryField #type: ignore
from .generate_ulid import generate_ulid

class Shelter(models.Model):
    shelter_id = models.CharField(
        max_length=26,
        default=generate_ulid,
        editable=False,
        unique=True)

    email = models.EmailField(unique=True)
    name = models.CharField(
        max_length=100,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    country = models.CharField(max_length=2, blank=True,)
    city = models.CharField(max_length=80, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    website = models.URLField(blank=True)

    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["shelter_id"]),
            models.Index(fields=["name"]),
        ]
    def __str__(self):
        return self.name