from django.db import models
from django.contrib.auth.models import User


class TelegramID(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    tg_id = models.BigIntegerField(blank=True)
