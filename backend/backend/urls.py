from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # API endpoints
    path('beaches/', BeachView.as_view(), name='beach-list'),  # List all beaches or create a new beach
    path('beaches/<int:pk>/', BeachView.as_view(), name='beach-detail'),  # Retrieve, update, or delete a specific beach by pk

    path('weather/', WeatherView.as_view(), name='weather-list'),  # List all weather records or create a new weather record

    path('water-quality/', WaterQualityView.as_view(), name='water-quality-list'),  # List all water quality records or create a new water quality record

    path('reports/', CommunityReportView.as_view()),  # List all community reports or create a new report
    path('reports/<int:pk>/', CommunityReportView.as_view()),  # Retrieve, update, or delete a specific community report by pk


    # Beach Specific Chat endpoints
    path('beachSpecific-chat/', BeachSpecificChatView.as_view(), name='beach-specific-chat'),  # List all beach-specific chats or create a new chat
    path('beachSpecific-chat/<int:pk>/like/', MessageView.as_view(), name='message'),  # List all beach-specific chats or create a new chat

    # Admin Profile endpoints
    path('admin-profiles/', AdminProfileView.as_view(), name='admin-profiles'),  # List all admin profiles or create a new profile
    path('adminLogin/', AdminLoginView.as_view(), name='admin-login'),
    path('adminLogout/', AdminLogoutView.as_view(), name='admin-logout'),
]
