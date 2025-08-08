from django.urls import path, include #type: ignore

urlpatterns = [
    path('v1/', include('api.v1.urls'), name='V1 endpoints'),
    # path('users/', include('users.urls'))
]