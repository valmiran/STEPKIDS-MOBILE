from rest_framework.views import APIView
from rest_framework.response import Response
from monitoring.models import OrthosisUsage, DailyChecklist, Symptom
from activities.models import Activity


class WeeklyReportView(APIView):
    def get(self, request, child_id):
        usages = OrthosisUsage.objects.filter(child_id=child_id, child__guardian=request.user).count()
        checklists = DailyChecklist.objects.filter(child_id=child_id, child__guardian=request.user).count()
        symptoms = Symptom.objects.filter(child_id=child_id, child__guardian=request.user).count()
        activities = Activity.objects.filter(child_id=child_id, child__guardian=request.user).count()

        return Response({
            'child_id': child_id,
            'orthosis_records': usages,
            'checklists': checklists,
            'symptoms': symptoms,
            'activities': activities
        })