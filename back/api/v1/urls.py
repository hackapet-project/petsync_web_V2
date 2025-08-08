from django.urls import path, include #type: ignore

urlpatterns = [
    path('users/', include('api.v1.users.urls')),
    # path('users/', include('users.urls'))
]