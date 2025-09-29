import pytest #type: ignore
from datetime import timedelta
from django.utils import timezone
from freezegun import freeze_time

@pytest.mark.django_db
class TestSessionToken():
    def test_logs_user_in_with_valid_credentials(self, auth_client, default_user):
        uri = '/v1/auth/session_tokens/'
        c = auth_client
        payload = {
            'email': 'foo@bar.test',
            'password': 'test'
        }

        response = c.post(uri, payload, format='json')

        assert response.status_code == 200
        assert "session_token" in response.cookies
        assert "refresh_token" in response.cookies

    def test_returns_401_code_with_invalid_credentials(self, client):
        uri = '/v1/auth/session_tokens/'
        payload = {
            'user': 'not a valid user',
            'email': 'not a valid email',
            'password': 'wrong password'
        }

        response = client.post(uri, payload, format='json')

        assert response.status_code == 401
        assert "session_token" not in response.cookies
        assert "refresh_token" not in response.cookies

    def test_expired_access_token_can_be_refreshed(self, client, default_user):
        """Test that an expired access token can be refreshed with a valid refresh token"""
        # Login to get tokens
        uri = '/v1/auth/session_tokens/'
        payload = {
            'email': 'foo@bar.test',
            'password': 'test'
        }
        response = client.post(uri, payload, format='json')
        
        # Extract tokens from cookies
        access_token = response.cookies.get('session_token')
        refresh_token = response.cookies.get('refresh_token')

        print(
            f"== ACCESS == {access_token}",
            f"== REFRESH == {refresh_token}"
        )
        
        # Simulate time passing (access token expires after 5 minutes based on your max_age)
        with freeze_time(timezone.now() + timedelta(minutes=6)):
            # Try to access a protected endpoint with expired access token
            protected_uri = '/v1/auth/'

            response = client.get(
                protected_uri,
                HTTP_COOKIE=f'session_token={access_token}'
            )
            # Should fail with expired token
            assert response.status_code in [401, 403]
            
            # Now refresh the token
            refresh_uri = '/v1/auth/refresh/'  # Your refresh endpoint
            response = client.post(
                refresh_uri,
                HTTP_COOKIE=f'refresh_token={refresh_token}'
            )
            
            # Should get new access token
            assert response.status_code == 200
            assert "session_token" in response.cookies
            new_access_token = response.cookies.get('session_token')
            assert new_access_token != access_token