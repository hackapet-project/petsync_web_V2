from rest_framework.views import APIView #type: ignore
from api.models.user import User as user_model
from ..serializer import UserSerializer
from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, NOT_FOUND

responses = get_responses()

class User(APIView):

    def get(self, request, user_id):
        if not user_id:
            return responses[BAD_REQUEST]({'message': 'bad request'})
        
        user_found = user_model.objects.get(user_id=user_id)

        if not user_found:
            return responses[NOT_FOUND]({'message': 'User not found'})
        
        serialized = UserSerializer(user_found)

        return responses[OK](serialized.data)
