from django.db import models #type: ignore
import generate_ulid

class Shelter(models.Model):
    shelter_id = models.CharField(
        max_length=26,
        default=generate_ulid,
        editable=False,
        unique=True)

    name = models.CharField(
        max_length=100,
    )