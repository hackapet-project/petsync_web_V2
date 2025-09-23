from django.contrib.auth import get_user_model #type: ignore
from rest_framework.test import APIClient #type: ignore
from rest_framework_simplejwt.tokens import AccessToken #type: ignore

from api.models.shelter import Shelter
# from api.models.user import User
import pytest #type: ignore

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def default_shelter(db):
    shelter, _ = Shelter.objects.get_or_create(
        email="contact@foo.test",
        defaults={
            'name': 'Foo Shelter',
            'country': 'ES',
            'city': 'Valencia',
            'phone': '000000000',
            'website': 'https://www.fooshelter.com',
            'description': 'A well written description',
        }
    )
    return shelter

@pytest.fixture
def default_user(db, default_shelter):
    User = get_user_model()
    user, _ = User.objects.get_or_create(
        email="foo@bar.test",   # <- unique
        defaults={
            "name": "Foo",
            "password": "test",  # will be set via create_user
            "shelter": default_shelter,
        },
    )
    return user
# @pytest.mark.django_db
@pytest.fixture
def user_factory(db, default_shelter):
    def _make_user(
        email='foo@bar.test',
        password='test',
        name='Foo',
        shelter=None,
        #position='FooBar Developer',
        #summary='A very long summary',
        #description='A well writed description'
    ):

        User = get_user_model()

        if shelter is None:
            shelter = default_shelter

        return User.objects.create_user(
            name=name,
            email=email,
            password=password,
            shelter=shelter,
        )
    return _make_user

@pytest.fixture
def shelter_factory(db):
    def _make_shelter(**overrides):

        defaults = {
            'name':'Foo Shelter',
            'email':'contact@foo.test',
            'country' : 'ES',
            'city' : 'Valencia',
            'phone' : '000000000',
            'website': 'https://www.fooshelter.com',
            #position='FooBar Developer',
            #summary='A very long summary',
            'description':'A well writed description'
        }

        defaults.update(overrides)
        return Shelter.objects.create(**defaults)
    return _make_shelter

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
