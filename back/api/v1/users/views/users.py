from rest_framework.views import APIView #type: ignore
from api.utils.custom_reponses import get_responses, OK

responses = get_responses()

class Users(APIView):

    def get(self, request):
        return responses[OK]([{'user': 'Diego'}])