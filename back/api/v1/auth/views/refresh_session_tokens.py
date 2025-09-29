from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, UNAUTHORIZED

import sys

responses = get_responses()

class RefreshSessionTokens(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        print(f"DEBUG: refresh_token from cookie: {refresh_token}", file=sys.stderr) 
        
        if not refresh_token:
            return responses[BAD_REQUEST]({'error': 'Refresh token is required'})
        
        try:
            # Verify and refresh the token
            token = RefreshToken(refresh_token)
            new_access_token = str(token.access_token)
            
            response = responses[OK]()
            response.set_cookie(
                key='session_token',
                value=new_access_token,
                httponly=True,
                secure=False,
                domain=None,
                samesite='None',
                max_age=300
            )
            return response
            
        except TokenError:
            return responses[UNAUTHORIZED]({'error': 'Invalid or expired refresh token'})