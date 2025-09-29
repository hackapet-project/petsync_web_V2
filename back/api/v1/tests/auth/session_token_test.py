import pytest #type: ignore

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

    def test_returns_400_code_with_invalid_credentials(self, client):
        uri = '/v1/auth/session_tokens/'
        payload = {
            'user': 'not a valid user',
            'email': 'not a valid email',
            'password': 'wrong password'
        }

        response = client.post(uri, payload, format='json')

        assert response.status_code == 400
        assert "session_token" not in response.cookies
        assert "refresh_token" not in response.cookies