from django.urls import reverse #type: ignore
from rest_framework import status #type: ignore

import pytest #type: ignore

@pytest.mark.django_db
class TestShelterViewPermissions():
    """Test shelter API endpoint permissions"""

    def test_admin_can_access_all_shelters(self, authenticated_clients, test_data_setup):
        """Admin should be able to access all shelters via API"""
        client = authenticated_clients['admin']
        
        response = client.get('/v1/shelters/')
        
        assert response.status_code == status.HTTP_200_OK
        shelter_names = [shelter['name'] for shelter in response.data]
        assert 'Happy Paws Shelter' in shelter_names
        assert 'Rescue Haven' in shelter_names

    def test_moderator_can_only_access_own_shelter(self, authenticated_clients, test_data_setup):
        """Moderator should only see their own shelter"""
        client = authenticated_clients['moderator1']
        
        response = client.get('/v1/shelters/')
        
        assert response.status_code == status.HTTP_200_OK
        shelter_names = [shelter['name'] for shelter in response.data]
        assert 'Happy Paws Shelter' in shelter_names
        assert 'Rescue Haven' not in shelter_names
        assert len(response.data) == 1

    def test_regular_user_cannot_access_shelter_management(self, authenticated_clients):
        """Regular users should not access shelter management"""
        client = authenticated_clients['user1']
        
        response = client.get('/v1/shelters/')
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
