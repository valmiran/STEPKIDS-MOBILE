from django.db import models
from children.models import Child


class OrthosisUsage(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='orthosis_usages')
    date = models.DateField(auto_now_add=True)
    used_today = models.BooleanField(default=False)
    usage_hours = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True, null=True)


class DailyChecklist(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='checklists')
    date = models.DateField(auto_now_add=True)
    used_today = models.BooleanField(default=False)
    felt_pain = models.BooleanField(default=False)
    slept_with_orthosis = models.BooleanField(default=False)
    restlessness = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)


class Symptom(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='symptoms')
    date = models.DateField(auto_now_add=True)
    symptom_type = models.CharField(max_length=120)
    intensity = models.PositiveIntegerField(default=1)
    description = models.TextField(blank=True, null=True)