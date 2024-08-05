from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

class BeachView(APIView):
    def get(self, request):
        output = [{"name": output.name,
                   "latitude":output.latitude,
                   "longitude":output.longitude}
                  for output in Beach.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = BeachSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
