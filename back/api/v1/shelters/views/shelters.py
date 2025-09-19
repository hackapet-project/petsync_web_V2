from rest_framework.views import APIView #type: ignore
from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST

responses = get_responses()

class Shelters(APIView):

  def get(self, request):
    return responses[OK]()