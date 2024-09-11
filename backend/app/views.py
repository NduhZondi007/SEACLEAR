from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Beach, Weather, WaterQuality, CommunityReport, UserProfile, AdminProfile, BeachSpecificChat, Message
from .serializer import BeachSerializer, WeatherSerializer, WaterQualitySerializer, CommunityReportSerializer, UserProfileSerializer, AdminProfileSerializer, BeachSpecificChatSerializer, MessageSerializer

class BeachView(APIView):
    # Handles GET, POST, and PUT requests for the Beach model
    
    def get(self, request):
        # Retrieve and return a list of all beaches
        beaches = Beach.objects.all()
        serializer = BeachSerializer(beaches, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new beach with the provided data
        serializer = BeachSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # Update an existing beach identified by pk
        try:
            beach = Beach.objects.get(pk=pk)
        except Beach.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BeachSerializer(beach, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WeatherView(APIView):
    # Handles GET and POST requests for the Weather model
    
    def get(self, request):
        # Retrieve and return a list of all weather records
        weather = Weather.objects.all()
        serializer = WeatherSerializer(weather, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new weather record with the provided data
        serializer = WeatherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WaterQualityView(APIView):
    # Handles GET and POST requests for the WaterQuality model
    
    def get(self, request):
        # Retrieve and return a list of all water quality records
        water_quality = WaterQuality.objects.all()
        serializer = WaterQualitySerializer(water_quality, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new water quality record with the provided data
        serializer = WaterQualitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommunityReportView(APIView):
    # Handles GET and POST requests for the CommunityReport model
    
    def get(self, request):
        # Retrieve and return a list of all community reports
        reports = CommunityReport.objects.all()
        serializer = CommunityReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new community report with the provided data
        serializer = CommunityReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # Update an existing community report identified by pk
        try:
            report = CommunityReport.objects.get(pk=pk)
        except CommunityReport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CommunityReportSerializer(report, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    # Handles GET and POST requests for the UserProfile model
    
    def get(self, request):
        # Retrieve and return a list of all user profiles
        user_profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new user profile with the provided data
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminProfileView(APIView):
    # Handles GET and POST requests for the AdminProfile model
    
    def get(self, request):
        # Retrieve and return a list of all admin profiles
        admin_profiles = AdminProfile.objects.all()
        serializer = AdminProfileSerializer(admin_profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new admin profile with the provided data
        serializer = AdminProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BeachSpecificChatView(APIView):
    # Handles GET and POST requests for the BeachSpecificChat model
    
    def get(self, request):
        # Retrieve and return a list of all beach-specific chats
        beach_specific_chats = BeachSpecificChat.objects.all()
        serializer = BeachSpecificChatSerializer(beach_specific_chats, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new beach-specific chat with the provided data
        serializer = BeachSpecificChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MessageView(APIView):
    # Handles GET and POST requests for the Message model
    
    def get(self, request):
        # Retrieve and return a list of all messages
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new message with the provided data
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
