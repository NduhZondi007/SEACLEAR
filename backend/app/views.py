from venv import logger
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .models import Beach, Weather, WaterQuality, CommunityReport, AdminProfile, BeachSpecificChat, Message
from .serializer import BeachSerializer, WeatherSerializer, WaterQualityCreateUpdateSerializer, WaterQualityOutputSerializer, CommunityReportSerializer, AdminProfileSerializer, BeachSpecificChatSerializer, MessageSerializer

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
        serializer = WaterQualityOutputSerializer(water_quality, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new water quality record with the provided data
        serializer = WaterQualityCreateUpdateSerializer(data=request.data)
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
    
    def put(self, request, pk):
        try:
            message = Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        username = request.data.get('username')  # Get the username from the request data
        if not username:
            return Response({'error': 'Username not provided'}, status=status.HTTP_400_BAD_REQUEST)

        likedBy = message.likedBy

        if username not in likedBy:
            message.likeCount += 1
            likedBy.append(username)
            message.likedBy = likedBy
            message.save()
            return Response({'likeCount': message.likeCount})

        return Response({'error': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)
    
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

class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            if AdminProfile.objects.filter(user=user).exists():
                admin_profile = AdminProfile.objects.get(user=user)
                serializer = AdminProfileSerializer(admin_profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is not an admin"}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class AdminLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
