from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate

from rest_framework.views import APIView #type: ignore
from rest_framework.response import Response #type:ignore
from rest_framework import status #type:ignore

from api.utils.custom_reponses import get_responses, OK, BAD_REQUEST, UNAUTHORIZED
from api.utils.repositories.user_repository import UserRepository
from api.utils.auth.token_authenticator import TokenAuthenticator

import sys

responses = get_responses()
user_repository = UserRepository()
token_authenticator = TokenAuthenticator()

class SessionTokens(APIView):

    def post(self, request):
        # users = user_repository.get_all()
        body = request.data
        email = body.get('email')
        password = body.get('password')

        print('==== Email ==== ', email, file=sys.stderr)
        print('==== Password ==== ', password, file=sys.stderr)
        
        if not email or not password:
            return responses[BAD_REQUEST]({'error': 'Email and password are required'})
            
        user = authenticate(request, email=email, password=password)

        print('-- USER --', user, file=sys.stderr)
        # user = user_repository.authenticate(email=body.get('email'), password=body.get('password'))

        if user:
            # print('==== Ey yo mama: USER FOUND ====', file=sys.stderr)
            session_token = token_authenticator.sign(user)

            response = Response(status=status.HTTP_200_OK)

            response.set_cookie(
                key='session_token',
                value=session_token['access'],
                httponly=True,
                secure=False,
                domain=None,
                samesite='None',
                max_age=300
            )

            response.set_cookie(
                key='refresh_token',
                value=session_token['refresh'],
                httponly=True,
                secure=False,
                domain=None,
                samesite='None',
                max_age=86400
            )

            return response
        else:
            print('==== NO USER FOUND ====', file=sys.stderr)
            return responses[UNAUTHORIZED]({'message': 'Invalid credentials'})
