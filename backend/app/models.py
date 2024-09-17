from django.db import models
from django.contrib.auth.models import User

class Person(models.Model):
    # Abstract base class for common fields
    username = models.CharField(max_length=50, default="user")  # Username of the person

    class Meta:
        abstract = True  # This ensures that no database table is created for this model

    def __str__(self):
        return self.username

class AdminProfile(Person):
    # Admin profile extending Person
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')

    def __str__(self):
        return f"AdminProfile: {self.user.username}"  # Returns the username of the admin

class Weather(models.Model):
    # Represents the weather conditions at a beach
    temperature = models.FloatField()  # Current temperature in Celsius
    windSpeed = models.FloatField()  # Wind speed in km/h
    humidity = models.FloatField()  # Humidity percentage
    seaLevel = models.FloatField(default=1019)  # Sea level pressure
    forecast = models.CharField(max_length=50)  # Weather forecast description

    def __str__(self):
        return f"{self.forecast} - {self.temperature}°C"

class WaterQuality(models.Model):
    # Represents the water quality at a beach
    phLevel = models.FloatField()  # pH level of the water
    pollutionLevel = models.CharField(max_length=50)  # Level of pollution in the water
    isSafe = models.CharField(max_length=50)  # Safety status of the water

    def __str__(self):
        return f"pH: {self.phLevel}, Pollution: {self.pollutionLevel}, Safe: {self.isSafe}"

class Beach(models.Model):
    # Represents a beach with various attributes
    name = models.CharField(max_length=100)  # Name of the beach
    location = models.CharField(max_length=255, default="camps bay")  # Location of the beach
    latitude = models.FloatField(default=-33.3875)
    longitude = models.FloatField(default=18.4110)
    amenities = models.JSONField(default=list)  # Amenities available at the beach
    weather = models.OneToOneField(Weather, on_delete=models.SET_NULL, null=True, blank=True)  # Weather information for the beach
    waterQuality = models.OneToOneField(WaterQuality, on_delete=models.SET_NULL, null=True, blank=True)  # Water quality information for the beach

    def __str__(self):
        return self.name

class CommunityReport(models.Model):
    # Represents a report submitted by a user about a beach
    REPORT_TYPE_CHOICES = [
        ('Beach Specific', 'Beach Specific'),
        ('General', 'General'),
    ]

    PROBLEM_TYPE_CHOICES = [
        ('Pollution', 'Pollution'),
        ('Safety', 'Safety'),
        ('Other', 'Other'),
    ]
    URGENCY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    user = models.CharField(max_length=50, default="user")  # Username of the person who posted
    reportType = models.CharField(max_length=100, choices=REPORT_TYPE_CHOICES)  # Type of the report
    beach = models.CharField(max_length=100)  # Beach where the issue was observed
    problemType = models.CharField(max_length=100, choices=PROBLEM_TYPE_CHOICES)  # Type of problem
    status = models.CharField(max_length=50, default="Pending")  # Status of the report
    additionalInfo = models.TextField(blank=True, null=True)  # Additional information about the report
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='Low')  # Urgency level of the report

    def __str__(self):
        return f"Report by {self.user} on {self.beach}"

class BeachSpecificChat(models.Model):
    # Represents a chat for a specific beach
    messages = models.ManyToManyField('Message', blank=True)  # Messages related to this chat
    beach_name = models.CharField(max_length=100)  # Name of the beach for which the chat is maintained

    def __str__(self):
        return f"BeachSpecificChat for Beach: {self.beach_name}"

class Message(models.Model):
    # Represents a message in a chat
    sender = models.CharField(max_length=100)  # Sender of the message
    content = models.TextField()  # Content of the message

    def __str__(self):
        return f"Message by {self.sender}"
