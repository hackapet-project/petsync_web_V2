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

  def test_moderator_can_only_see_own_shelter_users(self, test_data_setup):
        """Moderators should only see users from their own shelter"""
        users = test_data_setup['users']
        queryset1 = User.objects.for_user(users['moderator1'])
        shelter1_users = set(queryset1.values_list('email', flat=True))
        expected_shelter1_users = {'mod1@test.com', 'user1@test.com'}

        queryset2 = User.objects.for_user(users['moderator2'])
        shelter2_users = set(queryset2.values_list('email', flat=True))
        expected_shelter2_users = {'mod2@test.com', 'user2@test.com'}

        assert shelter1_users == expected_shelter1_users
        assert shelter2_users == expected_shelter2_users
        assert 'mod2@test.com' not in shelter1_users
        assert 'user2@test.com' not in shelter1_users
        assert 'mod1@test.com' not in shelter2_users
        assert 'user1@test.com' not in shelter2_users

  def test_regular_user_cannot_see_any_users(self, test_data_setup):
        """Regular users should not see any users (empty queryset)"""
        users = test_data_setup['users']

        queryset1 = User.objects.for_user(users['user1'])
        queryset2 = User.objects.for_user(users['user2'])

        assert queryset1.count() == 0
        assert queryset2.count() == 0

  def test_user_without_role_cannot_see_users(self, user_factory, default_shelter):
        """Users without role attribute should not see any users"""
        user_no_role = user_factory(
            email="norole@test.com",
            name="No Role User",
            shelter=default_shelter
        )
        # Remove role to simulate edge case
        delattr(user_no_role, 'role')

        queryset = User.objects.for_user(user_no_role)
        assert queryset.count() == 0

  # @pytest.mark.django_db
  # def test_admins_has_full_access(self, user_factory):
  #   admin = user_factory()
  #   assert True == True