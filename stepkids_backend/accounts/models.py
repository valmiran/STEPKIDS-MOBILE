from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, full_name, cpf, password=None, **extra_fields):
        if not email:
            raise ValueError('O e-mail é obrigatório.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            full_name=full_name,
            cpf=cpf,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, full_name, cpf, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=120)
    cpf = models.CharField(max_length=14, unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    cep = models.CharField(max_length=9, blank=True, null=True)
    street = models.CharField(max_length=120, blank=True, null=True)
    number = models.CharField(max_length=10, blank=True, null=True)
    neighborhood = models.CharField(max_length=60, blank=True, null=True)
    city = models.CharField(max_length=60, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    complement = models.CharField(max_length=120, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'cpf']

    objects = UserManager()

    def __str__(self):
        return self.email