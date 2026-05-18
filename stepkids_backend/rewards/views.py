from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from monitoring.models import OrthosisUsage, DailyChecklist
from .models import Reward, RewardRedemption
from .serializers import RewardSerializer


class RewardViewSet(viewsets.ModelViewSet):
    serializer_class = RewardSerializer

    def get_queryset(self):
        return Reward.objects.filter(child__guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class RedeemRewardView(APIView):
    def post(self, request):
        child_id = request.data.get('child')
        reward_id = request.data.get('reward_id')

        reward = Reward.objects.get(id=reward_id, child__id=child_id, child__guardian=request.user)

        orthosis_days = OrthosisUsage.objects.filter(child_id=child_id, used_today=True).count()
        checklists = DailyChecklist.objects.filter(child_id=child_id).count()
        total_points = (orthosis_days * 10) + (checklists * 5)

        if total_points < reward.points_required:
            return Response({'detail': 'Pontos insuficientes.'}, status=status.HTTP_400_BAD_REQUEST)

        RewardRedemption.objects.create(child_id=child_id, reward=reward)
        reward.unlocked = False
        reward.save()

        return Response({'detail': 'Recompensa resgatada com sucesso.'})