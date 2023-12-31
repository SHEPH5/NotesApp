from django.db import models
from django.contrib.auth.models import User 



class Note(models.Model):
    post = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated']

    def __str__(self):
        return self.body[0:50]
    

