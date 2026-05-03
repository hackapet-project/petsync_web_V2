import uuid

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_animal_extended_fields"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Adoption",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("adoption_id", models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ("adoptant_name", models.CharField(max_length=100)),
                ("adoptant_email", models.EmailField(max_length=254)),
                ("state", models.CharField(choices=[("initiated", "Initiated"), ("in_review", "In review"), ("approved", "Approved"), ("frozen", "Frozen"), ("completed", "Completed"), ("rejected", "Rejected")], db_index=True, default="initiated", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("notes", models.TextField(blank=True)),
                ("animal", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="adoptions", to="api.animal")),
                ("responsable", models.ForeignKey(limit_choices_to={"role__in": ["ADMIN", "MODERATOR"]}, on_delete=django.db.models.deletion.PROTECT, related_name="managed_adoptions", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
