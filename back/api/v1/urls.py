from django.urls import path, include #type: ignore

urlpatterns = [
    path('users/', include('api.v1.users.urls')),
    path('auth/', include('api.v1.auth.urls')),
    path('shelters/', include('api.v1.shelters.urls')),
    # path('users/', include('users.urls'))
]