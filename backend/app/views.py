from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Beach, Weather, WaterQuality, CommunityReport, UserProfile
from .serializer import BeachSerializer, WeatherSerializer, WaterQualitySerializer, CommunityReportSerializer, UserProfileSerializer

class BeachView(APIView):
    def get(self, request):
        beaches = Beach.objects.all()
        serializer = BeachSerializer(beaches, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BeachSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WeatherView(APIView):
    def get(self, request):
        weather = Weather.objects.all()
        serializer = WeatherSerializer(weather, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WeatherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WaterQualityView(APIView):
    def get(self, request):
        water_quality = WaterQuality.objects.all()
        serializer = WaterQualitySerializer(water_quality, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WaterQualitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommunityReportView(APIView):
    def get(self, request):
        reports = CommunityReport.objects.all()
        serializer = CommunityReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommunityReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    def get(self, request):
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
