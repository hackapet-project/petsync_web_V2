# In your settings.py or a backends.py file
from django.contrib.auth.backends import ModelBackend #type: ignore
from django.contrib.auth import get_user_model #type: ignore
import sys
class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, email=None, **kwargs):
        User = get_user_model()
        email_to_use = email or username

        if not email_to_use:
            return None

        try:
            user = User.objects.get(email__iexact=User.objects.normalize_email(email_to_use).strip())
        except User.DoesNotExist:
            return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
