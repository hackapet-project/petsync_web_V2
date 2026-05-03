from rest_framework.views import APIView #type: ignore
from rest_framework.permissions import IsAuthenticated #type: ignore

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, CREATED, NOT_FOUND, FORBIDDEN, NO_CONTENT
from api.utils.permissions.roles import IsModeratorSameShelter, is_admin
from api.models.shelter import Shelter
from api.v1.shelters.serializer import ShelterSerializer

responses = get_responses()

class Shelters(APIView):
  permission_classes = [IsAuthenticated, IsModeratorSameShelter]

  def get(self, request):
    queryset = Shelter.objects.for_user(request.user)
    serialized = ShelterSerializer(queryset ,many=True)
    return responses[OK](serialized.data)

  def post(self, request):
    if not is_admin(request.user):
      return responses[FORBIDDEN]({'detail': 'You do not have permission to perform this action.'})

    serializer = ShelterSerializer(data=request.data)
    if not serializer.is_valid():
      return responses[BAD_REQUEST](serializer.errors)

    shelter = serializer.save()
    return responses[CREATED](ShelterSerializer(shelter).data)


class ShelterDetail(APIView):
  permission_classes = [IsAuthenticated, IsModeratorSameShelter]

  def get(self, request, shelter_id):
    shelter = Shelter.objects.for_user(request.user).filter(shelter_id=shelter_id).first()
    if shelter is None:
      return responses[NOT_FOUND]({'detail': 'Shelter not found.'})

    serialized = ShelterSerializer(shelter)
    return responses[OK](serialized.data)

  def patch(self, request, shelter_id):
    if not is_admin(request.user):
      return responses[FORBIDDEN]({'detail': 'You do not have permission to perform this action.'})

    shelter = Shelter.objects.filter(shelter_id=shelter_id).first()
    if shelter is None:
      return responses[NOT_FOUND]({'detail': 'Shelter not found.'})

    serializer = ShelterSerializer(shelter, data=request.data, partial=True)
    if not serializer.is_valid():
      return responses[BAD_REQUEST](serializer.errors)

    updated_shelter = serializer.save()
    return responses[OK](ShelterSerializer(updated_shelter).data)

  def delete(self, request, shelter_id):
    if not is_admin(request.user):
      return responses[FORBIDDEN]({'detail': 'You do not have permission to perform this action.'})

    shelter = Shelter.objects.filter(shelter_id=shelter_id).first()
    if shelter is None:
      return responses[NOT_FOUND]({'detail': 'Shelter not found.'})

    shelter.delete()
    return responses[NO_CONTENT]()
