from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from children.models import Child
from .models import OrthosisUsage, DailyChecklist, Symptom
from .serializers import OrthosisUsageSerializer, DailyChecklistSerializer, SymptomSerializer


class OrthosisUsageViewSet(viewsets.ModelViewSet):
    serializer_class = OrthosisUsageSerializer

    def get_queryset(self):
        return OrthosisUsage.objects.filter(child__guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class DailyChecklistViewSet(viewsets.ModelViewSet):
    serializer_class = DailyChecklistSerializer

    def get_queryset(self):
        return DailyChecklist.objects.filter(child__guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class SymptomViewSet(viewsets.ModelViewSet):
    serializer_class = SymptomSerializer

    def get_queryset(self):
        return Symptom.objects.filter(child__guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class ProgressView(APIView):
    def get(self, request, child_id):
        child = Child.objects.get(id=child_id, guardian=request.user)

        total_points = 0
        orthosis_usage_days = child.orthosis_usages.filter(used_today=True).count()
        completed_checklists = child.checklists.count()

        total_points += orthosis_usage_days * 10
        total_points += completed_checklists * 5

        streak_days = orthosis_usage_days

        return Response({
            'child_id': child.id,
            'child_name': child.name,
            'total_points': total_points,
            'completed_checklists': completed_checklists,
            'orthosis_usage_days': orthosis_usage_days,
            'streak_days': streak_days,
            'reward_target': 100
        })