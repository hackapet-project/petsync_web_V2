from django.contrib.auth import authenticate
from django.conf import settings

from rest_framework.views import APIView #type: ignore
from rest_framework.response import Response #type:ignore
from rest_framework import status #type:ignore

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, UNAUTHORIZED
from api.utils.auth.token_authenticator import TokenAuthenticator

responses = get_responses()
token_authenticator = TokenAuthenticator()

class SessionTokens(APIView):

    def post(self, request):
        body = request.data
        email = body.get('email')
        password = body.get('password')

        if not email or not password:
            return responses[BAD_REQUEST]({'error': 'Email and password are required'})
            
        user = authenticate(request, username=email, password=password)

        if user:
            session_token = token_authenticator.sign(user)

            response = Response({
                'success': True,
                'user': {
                    'id': user.user_id,
                    'email': user.email,
                    'name': user.name,
                    'shelter': user.shelter.shelter_id if user.shelter else None,
                }
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='session_token',
                value=session_token['access'],
                httponly=True,
                secure=False,
                domain=None,
                samesite='Lax',
                path='/',
                max_age=300
            )

            response.set_cookie(
                key='refresh_token',
                value=session_token['refresh'],
                httponly=True,
                secure=False,
                domain=None,
                samesite='Lax',
                path='/',
                max_age=86400
            )

            return response
        else:
            return responses[UNAUTHORIZED]({'message': 'Invalid credentials'})
