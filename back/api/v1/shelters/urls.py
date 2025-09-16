from django.urls import path, include #type: ignore

from api.v1.shelters.views.shelters import Shelters

urlpatterns = [
  path('', Shelters.as_view(), name='Shelters list')
]