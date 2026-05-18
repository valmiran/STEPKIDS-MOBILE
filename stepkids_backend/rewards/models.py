from django.db import models
from children.models import Child


class Reward(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='rewards')
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255)
    points_required = models.PositiveIntegerField(default=50)
    unlocked = models.BooleanField(default=False)


class RewardRedemption(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='reward_redemptions')
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    redeemed_at = models.DateTimeField(auto_now_add=True)