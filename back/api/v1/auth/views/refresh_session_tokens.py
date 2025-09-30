from rest_framework.permissions import AllowAny #type: ignore
from rest_framework_simplejwt.tokens import RefreshToken #type: ignore
from rest_framework_simplejwt.views import TokenRefreshView #type: ignore

from api.utils.custom_reponses import get_responses, OK, UNAUTHORIZED

import sys

responses = get_responses()

class RefreshSessionTokens(TokenRefreshView):
    permission_classes = [AllowAny]
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        # print(f"DEBUG: refresh_token from cookie: {refresh_token}", file=sys.stderr) 
        
        if not refresh_token:
            return responses[UNAUTHORIZED]({'error': 'Refresh token is missing'})
        
        serializer = self.get_serializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        
        response = responses[OK]()
        response.set_cookie(
            "session_token",
            serializer.validated_data["access"],
            httponly=True,
            samesite="None",
            secure=False,
            max_age=300,
        )
        return response
