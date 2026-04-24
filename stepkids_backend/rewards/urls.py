from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RewardViewSet, RedeemRewardView

router = DefaultRouter()
router.register(r'', RewardViewSet, basename='rewards')

urlpatterns = router.urls + [
    path('redeem/', RedeemRewardView.as_view()),
]