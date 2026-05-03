import uuid
from django.db import models

from core import settings


class Adoption(models.Model):

    class State(models.TextChoices):
        INITIATED  = "initiated",  "Initiated"
        IN_REVIEW  = "in_review",  "In review"
        APPROVED   = "approved",   "Approved"
        FROZEN     = "frozen",     "Frozen"
        COMPLETED  = "completed",  "Completed"
        REJECTED   = "rejected",   "Rejected"

    # Public / private ID split
    # id        = models.BigAutoField(primary_key=True)          # private DB key
    adoption_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)

    animal      = models.ForeignKey("Animal",      on_delete=models.PROTECT, related_name="adoptions")
    responsable =  models.ForeignKey(
        settings.AUTH_USER_MODEL,          # points to your custom User
        on_delete=models.PROTECT,
        related_name="managed_adoptions",
        limit_choices_to={"role__in": ["ADMIN", "MODERATOR"]},  # DB-level hint
    )
    adoptant_name  = models.CharField(max_length=100)
    adoptant_email = models.EmailField()

    state      = models.CharField(max_length=20, choices=State.choices, default=State.INITIATED, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Optional: track who froze/rejected and why
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Adoption {self.adoption_id} — {self.animal} [{self.state}]"