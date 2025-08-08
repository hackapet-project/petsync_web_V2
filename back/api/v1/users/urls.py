from django.urls import path, include #type: ignore
from api.v1.users.views.users import Users
from api.v1.users.views.user import User

urlpatterns = [
    path('', Users.as_view(), name='User list'),
    path('<str:user_id>/', User.as_view(), name='User detail')
]