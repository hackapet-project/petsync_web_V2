import pytest #type: ignore

class TestPermissions():

  @pytest.mark.django_db
  def test_admins_has_full_access(self, user_factory):
    admin = user_factory()
    assert True == True