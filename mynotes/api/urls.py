from django.urls import path
from .views import ListNotes, DetailNotes
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
from .serializer import TokenObtainPairView

urlpatterns = [
    path('notes/', ListNotes.as_view(), name='home'),
    path('notes/<str:pk>/', DetailNotes.as_view(), name='details'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]