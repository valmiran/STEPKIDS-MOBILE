from django.db import models
from django.conf import settings


class Child(models.Model):
    guardian = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='children'
    )
    name = models.CharField(max_length=120)
    birth_date = models.DateField(blank=True, null=True)
    age = models.PositiveIntegerField()
    avatar = models.URLField(blank=True, null=True)
    diagnosis = models.CharField(max_length=255, blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'children'

    def __str__(self):
        return self.name