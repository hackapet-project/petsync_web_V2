from django.contrib.auth import get_user_model #type: ignore
from django.utils import timezone #type: ignore
from datetime import timedelta
from freezegun import freeze_time #type: ignore
import pytest #type: ignore

@pytest.mark.django_db
class TestSessionToken():
    def test_logs_user_in_with_valid_credentials(self, client, default_user):
        User = get_user_model()
        print(f"==== USER IN TEST ====")
        print(f"User email: {default_user.email}")
        print(f"User exists in DB: {User.objects.filter(email=default_user.email).exists()}")
        print(f"Total users in DB: {User.objects.count()}")
        uri = '/v1/auth/session_tokens/'
        payload = {
            'email': default_user.email,
            'password': 'test'
        }
        print(f"Payload: {payload}")

        response = client.post(uri, payload, format='json')

        print('== COOKIES ==', response.cookies)
        assert response.status_code == 200
        # assert False == True
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
        user = default_user
        payload = {
            'email': user.email,
            'password': user.password
        }
        login_response = client.post(uri, payload, format='json')
        
        # Extract tokens from cookies
        print(
            '== COOKIES COOKIES ==', login_response.cookies
        )
        access_token = login_response.cookies['session_token']
        refresh_token = login_response.cookies['refresh_token']

        self.client.cookies['session_token'] = access_token
        self.client.cookies['refresh_token'] = refresh_token

        # print(
        #     f"== ACCESS == {access_token}",
        #     f"== REFRESH == {refresh_token}"
        # )
        # Simulate time passing (access token expires after 5 minutes based on your max_age)
        with freeze_time(timezone.now() + timedelta(minutes=6)):
            # Try to access a protected endpoint with expired access token
            protected_uri = '/v1/auth/'

            response = client.get(protected_uri)
            # Should fail with expired token
            assert response.status_code in [401, 403]
            
            # Now refresh the token
            refresh_uri = '/v1/auth/refresh/'  # Your refresh endpoint
            response = client.post(refresh_uri)
            
            # Should get new access token
            assert response.status_code == 200
            assert "session_token" in response.cookies
            new_access_token = response.cookies.get('session_token')
            assert new_access_token != access_token
