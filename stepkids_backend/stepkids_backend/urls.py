from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "StepKids API rodando",
        "status": "online"
    })


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),

    path('api/accounts/', include('accounts.urls')),
    path('api/children/', include('children.urls')),
    path('api/monitoring/', include('monitoring.urls')),
    path('api/activities/', include('activities.urls')),
    path('api/rewards/', include('rewards.urls')),
    path('api/reports/', include('reports.urls')),
]