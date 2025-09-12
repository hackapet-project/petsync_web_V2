class TestGetShelters():
    def test_get_a_list_of_shelters(self, client):
        # Arrange
        uri = '/v1/shelters/'
        # Act
        response = client.get(uri)
        # Assert
        assert response.status_code == 200
        # self.assertEqual(True, False)
        # assert response.data.lenght == 0

    # def _test_get_a_detailed_shelter_view(self, client):
    #     # Arrange
    #     uri = '/v1/shelters/a-valid-shelter-id'
    #     # Act
    #     response = client.get(uri)
    #     # Assert
    #     assert response.status_code == 200
    #     # assert response.data.lenght == 0