from django.db import models
from children.models import Child


class Activity(models.Model):
    CATEGORY_CHOICES = [
        ('estudo', 'Estudo'),
        ('higiene', 'Higiene'),
        ('organizacao', 'Organização'),
        ('atividade_fisica', 'Atividade Física'),
    ]

    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='activities')
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    score = models.PositiveIntegerField(default=10)
    due_date = models.DateField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)