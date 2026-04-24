from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import OrthosisUsageViewSet, DailyChecklistViewSet, SymptomViewSet, ProgressView

router = DefaultRouter()
router.register(r'orthosis-usage', OrthosisUsageViewSet, basename='orthosis-usage')
router.register(r'checklists', DailyChecklistViewSet, basename='checklists')
router.register(r'symptoms', SymptomViewSet, basename='symptoms')

urlpatterns = router.urls + [
    path('progress/<int:child_id>/', ProgressView.as_view()),
]