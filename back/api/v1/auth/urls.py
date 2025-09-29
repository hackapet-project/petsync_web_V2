from django.urls import path, include #type: ignore
from api.v1.auth.views.session_tokens import SessionTokens
from api.v1.auth.views.refresh_session_tokens import RefreshSessionTokens
from api.v1.auth.views.auth import Auth

urlpatterns = [
    path('session_tokens/', SessionTokens.as_view(), name='Login view'),
    path('refresh/', RefreshSessionTokens.as_view(), name='Refresh token view'),
    path('', Auth.as_view(), name='Protected view')
]