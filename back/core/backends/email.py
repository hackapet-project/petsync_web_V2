# In your settings.py or a backends.py file
from django.contrib.auth.backends import ModelBackend #type: ignore
from django.contrib.auth import get_user_model #type: ignore
import sys
class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        User = get_user_model()
        print('IS THIS CALLING ME??', file=sys.stderr)
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None
        
        if user.check_password(password):
            return user
        return None
