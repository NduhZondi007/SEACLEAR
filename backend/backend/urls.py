"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('beaches/', BeachView.as_view(), name='beach-list'),
    path('beaches/<int:pk>/', BeachView.as_view(), name='beach-detail'),
    path('weather/', WeatherView.as_view(), name='weather-list'),
    path('water-quality/', WaterQualityView.as_view(), name='water-quality-list'),
    path('reports/', CommunityReportView.as_view()),  
    path('reports/<int:pk>/', CommunityReportView.as_view()),  
    path('user-profiles/', UserProfileView.as_view(), name='user-profiles'),
    path('admin-profiles/', AdminProfileView.as_view(), name='admin-profiles'),
    path('beachSpecific-chat/', BeachSpecificChatView.as_view(), name='beach-specific-chat'),
]
 