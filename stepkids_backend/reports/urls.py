from django.urls import path
from .views import WeeklyReportView

urlpatterns = [
    path('weekly/<int:child_id>/', WeeklyReportView.as_view()),
]