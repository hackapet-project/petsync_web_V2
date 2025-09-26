from api.models.user import User
# from api.v1.tests.utils.test_data_setup import test_data_setup

import pytest #type: ignore

@pytest.mark.django_db
class TestPermissions():

  def test_admin_can_see_all_users(self, test_data_setup):
        """Admins should see all users regardless of shelter"""
        admin = test_data_setup['users']['admin']
        expected_emails = {
            'admin@test.com', 'mod1@test.com', 'mod2@test.com',
            'user1@test.com', 'user2@test.com'
        }

        queryset = User.objects.for_user(admin)
        user_emails = set(queryset.values_list('email', flat=True))

        # Verify all users from both shelters are included
        assert queryset.count() == 5
        assert user_emails == expected_emails

  # @pytest.mark.django_db
  # def test_admins_has_full_access(self, user_factory):
  #   admin = user_factory()
  #   assert True == True