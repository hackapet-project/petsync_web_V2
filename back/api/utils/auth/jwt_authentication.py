from rest_framework_simplejwt.authentication import JWTAuthentication #type: ignore
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed #type: ignore

class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom authentication class that reads JWT from cookies instead of Authorization header
    """
    def authenticate(self, request):
        # Get the token from cookies
        raw_token = request.COOKIES.get('session_token')
        
        if raw_token is None:
            print('== NO TOKEN POR QUÉ TOKAN? ==')
            return None
        
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except InvalidToken:
            raise AuthenticationFailed('Invalid or expired token')
