from rest_framework import serializers
from .models import OrthosisUsage, DailyChecklist, Symptom


class OrthosisUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrthosisUsage
        fields = '__all__'


class DailyChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyChecklist
        fields = '__all__'


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = '__all__'