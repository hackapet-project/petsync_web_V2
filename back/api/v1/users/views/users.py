from rest_framework.views import APIView #type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny #type: ignore

from api.utils.permissions.roles import IsModeratorSameShelter
from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, CREATED
from api.models.user import User as user_model
from ..serializer import UserSerializer, RegisterSerializer

responses = get_responses()

class Users(APIView):
    permission_classes = [IsAuthenticated, IsModeratorSameShelter]

    def get(self, request):
        queryset = user_model.objects.for_user(request.user)
        serialized = UserSerializer(queryset, many=True)
        return responses[OK](serialized.data)

    permission_classes_by_method = {
        'GET': [IsAuthenticated, IsModeratorSameShelter],
        'POST': [AllowAny],
    }

    def get_permissions(self):
        permission_classes = self.permission_classes_by_method.get(
            self.request.method,
            self.permission_classes
        )
        return [permission() for permission in permission_classes]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        user = serializer.save()
        return responses[CREATED](UserSerializer(user).data)
