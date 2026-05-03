from django.urls import path  # type: ignore

from api.v1.adoptions.views import AdoptionDetail, Adoptions

urlpatterns = [
    path("", Adoptions.as_view(), name="Adoptions list"),
    path("<uuid:adoption_id>/", AdoptionDetail.as_view(), name="Adoption detail"),
]
