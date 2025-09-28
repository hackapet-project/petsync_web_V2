from rest_framework.views import APIView #type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny #type: ignore

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST
from api.utils.permissions.roles import IsModeratorSameShelter
from api.models.shelter import Shelter
from api.v1.shelters.serializer import ShelterSerializer

responses = get_responses()

class Shelters(APIView):
  permission_classes = [IsAuthenticated, IsModeratorSameShelter]

  def get(self, request):
    queryset = Shelter.objects.for_user(request.user)
    serialized = ShelterSerializer(queryset ,many=True)
    return responses[OK](serialized.data)
