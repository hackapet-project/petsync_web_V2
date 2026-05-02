# views.py
from rest_framework.viewsets import ModelViewSet
from api.models.adoptions import Adoption
from .serializers import AdoptionSerializer, AdoptionCreateSerializer, AdoptionStateSerializer

class AdoptionViewSet(ModelViewSet):
    queryset = Adoption.objects.select_related("animal", "responsable").all()
    lookup_field = "adoption_id"

    def get_serializer_class(self):
        if self.action == "create":
            return AdoptionCreateSerializer
        if self.action in ("update", "partial_update"):
            return AdoptionStateSerializer
        return AdoptionSerializer