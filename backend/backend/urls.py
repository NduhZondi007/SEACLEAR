"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/

Examples:
Function views:
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')

Class-based views:
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')

Including another URLconf:
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # Beach endpoints
    path('beaches/', BeachView.as_view(), name='beach-list'),  # List all beaches or create a new beach
    path('beaches/<int:pk>/', BeachView.as_view(), name='beach-detail'),  # Retrieve, update, or delete a specific beach by pk

    # Weather endpoints
    path('weather/', WeatherView.as_view(), name='weather-list'),  # List all weather records or create a new weather record

    # Water Quality endpoints
    path('water-quality/', WaterQualityView.as_view(), name='water-quality-list'),  # List all water quality records or create a new water quality record

    # Community Report endpoints
    path('reports/', CommunityReportView.as_view()),  # List all community reports or create a new report
    path('reports/<int:pk>/', CommunityReportView.as_view()),  # Retrieve, update, or delete a specific community report by pk

    # Admin Profile endpoints
    path('admin-profiles/', AdminProfileView.as_view(), name='admin-profiles'),  # List all admin profiles or create a new profile

    # Beach Specific Chat endpoints
    path('beachSpecific-chat/', BeachSpecificChatView.as_view(), name='beach-specific-chat'),  # List all beach-specific chats or create a new chat

    path('admin_login/', AdminLoginView.as_view(), name='admin-login'),
]
