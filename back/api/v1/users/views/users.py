from rest_framework.views import APIView #type: ignore
from api.utils.custom_reponses import get_responses, OK
from api.models.user import User as user_model
from ..serializer import UserSerializer

responses = get_responses()

class Users(APIView):

    def get(self, request):
        users = user_model.objects.all()

        serialized = UserSerializer(users, many=True)
        return responses[OK](serialized.data)
