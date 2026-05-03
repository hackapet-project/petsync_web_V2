# Generated manually to align the database schema with api.models.animal

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_user_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='allergies',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='behavior_notes',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='birth_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='animal',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('unknown', 'Unknown')], default='unknown', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='intake_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='last_vet_visit',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='animal',
            name='medical_notes',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='microchipped',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='animal',
            name='outcome_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='animal',
            name='size',
            field=models.CharField(blank=True, choices=[('small', 'Small'), ('medium', 'Medium'), ('large', 'Large')], default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='species',
            field=models.CharField(choices=[('dog', 'Dog'), ('cat', 'Cat'), ('other', 'Other')], default='other', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='sterilized',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='animal',
            name='temperament',
            field=models.CharField(blank=True, default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now, auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='animal',
            name='vaccinated',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='animal',
            name='weight',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]
