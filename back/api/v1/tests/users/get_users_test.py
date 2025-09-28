from rest_framework import status #type: ignore
from django.urls import reverse #type: ignore
import pytest #type: ignore

class TestGetUsers():

    @pytest.mark.django_db
    def test_get_a_list_of_users(self, authenticated_clients):
        # Arrange
        uri = '/v1/users/'
        # Act
        response = authenticated_clients['admin'].get(uri)
        # Assert
        assert response.status_code == 200
        # self.assertEqual(True, False)
        # assert response.data.lenght == 0

    @pytest.mark.django_db
    def test_return_404_when_no_user_was_found(self, client):
        url = '/v1/users/an-invalid-user-id/'

        res = client.get(url)

        assert res.status_code == status.HTTP_404_NOT_FOUND

    def test_get_a_detailed_user_view(self, auth_client, default_user):
        user = default_user
        url = reverse("User detail", kwargs={"user_id": user.user_id})
        expected_id = getattr(user, "user_id", user.pk)

        res = auth_client.get(url)

        assert res.status_code == status.HTTP_200_OK
        assert res.data.get("user_id", res.data.get("id")) == expected_id
