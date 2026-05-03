from django.urls import path  # type: ignore

from api.v1.animals.views.animals import AnimalDetail, Animals

urlpatterns = [
    path("", Animals.as_view(), name="Animals list"),
    path("<str:animal_id>/", AnimalDetail.as_view(), name="Animal detail"),
]
