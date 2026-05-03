from rest_framework.permissions import IsAuthenticated  # type: ignore
from rest_framework.views import APIView  # type: ignore

from api.models.animal import Animal
from api.utils.custom_reponses import BAD_REQUEST, CREATED, FORBIDDEN, NOT_FOUND, OK, get_responses
from api.utils.permissions.roles import IsModeratorSameShelter, is_admin, is_moderator
from api.v1.animals.serializer import AnimalSerializer, AnimalWriteSerializer

responses = get_responses()


class Animals(APIView):
    permission_classes = [IsAuthenticated, IsModeratorSameShelter]

    def get(self, request):
        queryset = self._queryset_for_user(request.user)
        serialized = AnimalSerializer(queryset.order_by("-created_at"), many=True)
        return responses[OK](serialized.data)

    def post(self, request):
        serializer = AnimalWriteSerializer(data=request.data)
        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        shelter = serializer.validated_data["shelter"]
        if is_moderator(request.user) and request.user.shelter_id != shelter.id:
            return responses[FORBIDDEN]({"detail": "You do not have permission to create animals for this shelter."})

        animal = serializer.save()
        return responses[CREATED](AnimalSerializer(animal).data)

    def _queryset_for_user(self, user):
        queryset = Animal.objects.select_related("shelter")

        if is_moderator(user):
            return queryset.filter(shelter=user.shelter)

        return queryset


class AnimalDetail(APIView):
    permission_classes = [IsAuthenticated, IsModeratorSameShelter]

    def get(self, request, animal_id):
        animal = self._queryset_for_user(request.user).filter(animal_id=animal_id).first()
        if animal is None:
            return responses[NOT_FOUND]({"detail": "Animal not found."})

        serialized = AnimalSerializer(animal)
        return responses[OK](serialized.data)

    def patch(self, request, animal_id):
        animal = self._queryset_for_user(request.user).filter(animal_id=animal_id).first()
        if animal is None:
            return responses[NOT_FOUND]({"detail": "Animal not found."})

        serializer = AnimalWriteSerializer(animal, data=request.data, partial=True)
        if not serializer.is_valid():
            return responses[BAD_REQUEST](serializer.errors)

        shelter = serializer.validated_data.get("shelter")
        if is_moderator(request.user):
            if request.user.shelter is None or animal.shelter_id != request.user.shelter_id:
                return responses[FORBIDDEN]({"detail": "You do not have permission to modify this animal."})

            if shelter is not None and shelter.id != request.user.shelter_id:
                return responses[FORBIDDEN]({"detail": "You cannot move animals to another shelter."})

        updated_animal = serializer.save()
        return responses[OK](AnimalSerializer(updated_animal).data)

    def _queryset_for_user(self, user):
        queryset = Animal.objects.select_related("shelter")

        if is_moderator(user):
            return queryset.filter(shelter=user.shelter)

        return queryset
