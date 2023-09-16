from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Note
from .serializer import ListNoteSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class =  MyTokenObtainPairSerializer



class ListNotes(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = ListNoteSerializer

    def get_queryset(self):
        return Note.objects.filter(post=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(post=self.request.user)


class DetailNotes(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = ListNoteSerializer



    