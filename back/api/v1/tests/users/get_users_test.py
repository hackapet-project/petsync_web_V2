import pytest #type: ignore

class TestGetUsers():

    @pytest.mark.django_db
    def test_get_a_list_of_users(self, client):
        # Arrange
        uri = '/v1/users/'
        # Act
        response = client.get(uri)
        # Assert
        assert response.status_code == 200
        # self.assertEqual(True, False)
        # assert response.data.lenght == 0

    def _test_get_a_detailed_user_view(self, client):
        # Arrange
        uri = '/v1/users/a-valid-user-id'
        # Act
        response = client.get(uri)
        # Assert
        assert response.status_code == 200
        assert response.data.length != 0
        # assert response.data.lenght == 0