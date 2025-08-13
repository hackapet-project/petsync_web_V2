from rest_framework_simplejwt.tokens import AccessToken, RefreshToken #type: ignore
from rest_framework_simplejwt.authentication import JWTAuthentication #type: ignore
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken #type: ignore
from django.contrib.auth import get_user_model  #type: ignore

import sys

class TokenAuthenticator:
    def __init__(self):
        self.jwt_auth = JWTAuthentication()

    def sign(self, user):
        """Create tokens for a user"""
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def verify(self, token_string):
        """Verify a token and return payload if valid"""
        if not token_string:
            return None

        try:
            if token_string.startswith('session_token='):
                token_string = token_string[14:]

            token = AccessToken(token_string)
            return token.payload
        except (TokenError, InvalidToken):
            return None

    def authenticate_request(self, request):
        """Authenticate a request and return the token"""

        token = request.COOKIES.get('session_token')

        if not token:
            # print('cookies', request.COOKIES, file=sys.stderr)
            return None

        # print(token, file=sys.stderr)
        validated_token = self.verify(token)

        if not validated_token:
            return None

        return token

    # def get_user_from_token(self, token_string):
    #     """Get the user associated with a token"""
    #     payload = self.verify(token_string)
    #     if not payload:
    #         return None

    #     user_id = payload.get('user_id')
    #     if not user_id:
    #         return None

    #     User = get_user_model()

    #     try:
    #         return User.objects.get(id=user_id)
    #     except User.DoesNotExist:
    #         return None

