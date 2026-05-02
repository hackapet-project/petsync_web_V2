# urls.py
from rest_framework.routers import DefaultRouter
from .views import AdoptionViewSet

router = DefaultRouter()
router.register(r"adoptions", AdoptionViewSet)
urlpatterns = router.urls