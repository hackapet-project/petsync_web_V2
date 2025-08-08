from rest_framework.views import APIView #type: ignore
from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST

responses = get_responses()

class User(APIView):

    def get(self, request, user_id):
        if not user_id:
            return responses[BAD_REQUEST]({'message': 'bad request'})

        return responses[OK]([{'user': '123'}])