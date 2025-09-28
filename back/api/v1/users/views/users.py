from rest_framework.views import APIView #type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny #type: ignore

from api.utils.permissions.roles import IsModeratorSameShelter
from api.utils.custom_reponses import get_responses, OK
from api.models.user import User as user_model
from ..serializer import UserSerializer

responses = get_responses()

class Users(APIView):
    permission_classes = [IsAuthenticated, IsModeratorSameShelter]

    def get(self, request):
        queryset = user_model.objects.for_user(request.user)
        serialized = UserSerializer(queryset, many=True)
        return responses[OK](serialized.data)
