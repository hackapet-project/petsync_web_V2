class TestGetUsers:
    def test_get_a_list_of_users(self, client):
        # Arrange
        uri = '/v1/users/'
        # Act
        response = client.get(uri)
        # Assert
        assert response.status_code == 200
        # assert response.data.lenght == 0

    def test_get_a_detailed_user_view(self, client):
        # Arrange
        uri = '/v1/users/a-valid-user-id'
        # Act
        response = client.get(uri)
        # Assert
        assert response.status_code == 200
        # assert response.data.lenght == 0