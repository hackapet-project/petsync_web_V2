from django.contrib.auth import get_user_model #type: ignore
from rest_framework.test import APIClient #type: ignore
from rest_framework_simplejwt.tokens import AccessToken #type: ignore
import pytest #type: ignore

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def conversation_factory(db):
    pass

# @pytest.mark.django_db
@pytest.fixture
def user_factory(db):
    def _make_user(
        email='foo@bar.test',
        password='test',
        name='Foo',
        #company='FooBar',
        #position='FooBar Developer',
        #summary='A very long summary',
        #description='A well writed description'
    ):

        User = get_user_model()

        return User.objects.create_user(
            name=name,
            email=email,
            password=password,
            #company=company,
            #position=position,
            #summary=summary,
            #description=description,
        )
    return _make_user

@pytest.fixture
def auth_client(user_factory):
    user = user_factory()
    client = APIClient()

    client.force_authenticate(user=user)
    return client

@pytest.fixture
def jwt_client(user_factory):
    user = user_factory()
    client = APIClient()
    token = AccessToken.for_user(user)
    client.cookies["session_token"] = str(token)
    return client

# @pytest.fixture
# @pytest.mark.django_db
# def logged_in_client(api_client, user_factory):
    # """
    # Creates a user, logs in via JWT endpoint, returns (client, cookies dict)
    # """
    # uri = "/v1/auth/session_tokens/"
    # payload = {"email": "foo@bar.test", "password": "test"}
    # user_factory(email="foo@bar.test", password="test")

    # resp = api_client.post(uri, payload, format="json")

    # assert resp.status_code == 200, resp.content
    # # DRF APIClient exposes response.cookies as SimpleCookie
    # session_cookie = resp.cookies.get("session_token")
    # assert session_cookie is not None
    # # Set cookie on client for subsequent requests
    # api_client.cookies["session_token"] = session_cookie.value
    # return api_client, {"session_token": session_cookie.value}

    # return api_client