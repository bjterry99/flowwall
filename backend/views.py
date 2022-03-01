from rest_framework import viewsets
from .serializers import postSerializer
from .models import post

class postViewSet(viewsets.ModelViewSet):
    queryset = post.objects.all().order_by('post_id')
    serializer_class = postSerializer