from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny #type: ignore

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, UNAUTHORIZED

responses = get_responses()

class Auth(APIView):
    permission_classes = [ IsAuthenticated ]

    def get(self, request):
      return responses[OK]()