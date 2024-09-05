from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Beach, Weather, WaterQuality, CommunityReport, UserProfile, AdminProfile, BeachSpecificChat, Message
from .serializer import BeachSerializer, WeatherSerializer, WaterQualitySerializer, CommunityReportSerializer, UserProfileSerializer, AdminProfileSerializer, BeachSpecificChatSerializer,MessageSerializer

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
        user_profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminProfileView(APIView):
    def get(self, request):
        admin_profiles = AdminProfile.objects.all()
        serializer = AdminProfileSerializer(admin_profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdminProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BeachSpecificChatView(APIView):
    def get(self, request):
        beach_specific_chats = BeachSpecificChat.objects.all()
        serializer = BeachSpecificChatSerializer(beach_specific_chats, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BeachSpecificChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MessageView(APIView):
    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)