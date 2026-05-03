from django.shortcuts import get_object_or_404 #type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from rest_framework.views import APIView #type: ignore
from api.models.user import User as user_model
from ..serializer import UserSerializer, AdminUserUpdateSerializer
from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, NOT_FOUND, FORBIDDEN
from api.utils.permissions.roles import IsModeratorSameShelter, is_admin

responses = get_responses()

class User(APIView):
    permission_classes = [IsAuthenticated, IsModeratorSameShelter]

    def get(self, request, user_id):
        if not user_id:
            return responses[BAD_REQUEST]({'message': 'bad request'})

        user_found = user_model.objects.for_user(request.user).filter(user_id=user_id).first()
        if user_found is None:
            return responses[NOT_FOUND]({'detail': 'User not found.'})

        serialized = UserSerializer(user_found)

        return responses[OK](serialized.data)

    def patch(self, request, user_id):
        if not is_admin(request.user):
            return responses[FORBIDDEN]({'detail': 'You do not have permission to perform this action.'})

        if not user_id:
            return responses[BAD_REQUEST]({'message': 'bad request'})

        user_found = user_model.objects.filter(user_id=user_id).first()
        if user_found is None:
            return responses[NOT_FOUND]({'detail': 'User not found.'})

        serializer = AdminUserUpdateSerializer(user_found, data=request.data, partial=True)
        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        updated_user = serializer.save()
        return responses[OK](UserSerializer(updated_user).data)
