from django.urls import path, include #type: ignore
from api.v1.auth.views.session_tokens import SessionTokens

urlpatterns = [
    path('session_tokens/', SessionTokens.as_view(), name='Login view')
]