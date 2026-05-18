from rest_framework import viewsets
from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        return Activity.objects.filter(child__guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save()