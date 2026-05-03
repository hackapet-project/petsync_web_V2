from rest_framework.views import APIView

from api.models.adoptions import Adoption
from api.utils.custom_reponses import BAD_REQUEST, CREATED, NOT_FOUND, OK, get_responses
from .serializer import AdoptionSerializer, AdoptionCreateSerializer, AdoptionStateSerializer

responses = get_responses()


class Adoptions(APIView):
    def get(self, request):
        queryset = Adoption.objects.select_related("animal", "responsable").all()
        serialized = AdoptionSerializer(queryset, many=True)
        return responses[OK](serialized.data)

    def post(self, request):
        serializer = AdoptionCreateSerializer(data=request.data, context={"request": request})
        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        adoption = serializer.save()
        return responses[CREATED](AdoptionSerializer(adoption).data)


class AdoptionDetail(APIView):
    def get(self, request, adoption_id):
        adoption = Adoption.objects.select_related("animal", "responsable").filter(adoption_id=adoption_id).first()
        if adoption is None:
            return responses[NOT_FOUND]({"detail": "Adoption not found."})

        return responses[OK](AdoptionSerializer(adoption).data)

    def patch(self, request, adoption_id):
        adoption = Adoption.objects.select_related("animal", "responsable").filter(adoption_id=adoption_id).first()
        if adoption is None:
            return responses[NOT_FOUND]({"detail": "Adoption not found."})

        serializer = AdoptionStateSerializer(adoption, data=request.data, partial=True)
        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        updated_adoption = serializer.save()
        return responses[OK](AdoptionSerializer(updated_adoption).data)
