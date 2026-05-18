from rest_framework import serializers
from .models import Child


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'
        read_only_fields = ['guardian', 'created_at']