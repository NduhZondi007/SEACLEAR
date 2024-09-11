from django.db import models
from django.contrib.auth.models import User

class Beach(models.Model):
    # Represents a beach with various attributes
    name = models.CharField(max_length=100)  # Name of the beach
    location = models.CharField(max_length=255, default="camps bay")  # Location of the beach
    amenities = models.JSONField(default=list)  # Amenities available at the beach, stored as a list of strings
    weather = models.OneToOneField('Weather', on_delete=models.SET_NULL, null=True, blank=True)  # Weather information for the beach
    waterQuality = models.OneToOneField('WaterQuality', on_delete=models.SET_NULL, null=True, blank=True)  # Water quality information for the beach

    def __str__(self):
        return self.name  # Return the name of the beach for a readable representation

class Weather(models.Model):
    # Represents the weather conditions at a beach
    temperature = models.FloatField()  # Current temperature in Celsius
    windSpeed = models.FloatField()  # Wind speed in km/h
    humidity = models.FloatField()  # Humidity percentage
    forecast = models.CharField(max_length=50)  # Weather forecast description

    def __str__(self):
        return f"{self.forecast} - {self.temperature}°C"  # Return a string with the forecast and temperature

class WaterQuality(models.Model):
    # Represents the water quality at a beach
    phLevel = models.FloatField()  # pH level of the water
    pollutionLevel = models.CharField(max_length=50)  # Level of pollution in the water
    isSafe = models.CharField(max_length=50)  # Safety status of the water

    def __str__(self):
        return f"pH: {self.phLevel}, Pollution: {self.pollutionLevel}, Safe: {self.isSafe}"  # Return a string describing the water quality

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

    user = models.CharField(max_length=50, default="user")  # Username of person who posted
    reportType = models.CharField(max_length=100, choices=REPORT_TYPE_CHOICES)  # Type of the report
    beach = models.CharField(max_length=100)  # Beach where the issue was observed
    problemType =models.CharField(max_length=100, choices=PROBLEM_TYPE_CHOICES)  # Detailed description of the problem
    status = models.CharField(max_length=50, default="Pending")  # Status of the report
    additionalInfo = models.TextField(blank=True, null=True)  # Additional information about the report
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='Low')  # Urgency level of the report

    def __str__(self):
        return f"Report by {self.user.username} on {self.beach.name}"  # Return a string with the report's details

class Person(models.Model):
    # Abstract base class for user profiles with common fields
    first_name = models.CharField(max_length=50, default="guestFirstname")  # First name of the person
    last_name = models.CharField(max_length=50, default="guestLastname")  # Last name of the person
    email = models.EmailField(unique=True, default="guest@gmail.com")  # Email address
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # Phone number (optional)
    bio = models.TextField(blank=True, null=True)  # Short biography (optional)

    class Meta:
        abstract = True  # Make this class abstract so no database table is created

    def __str__(self):
        return f"{self.first_name} {self.last_name}"  # Return the full name of the person

class UserProfile(Person):
    # User-specific profile extending Person
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')  # User associated with this profile

    def __str__(self):
        return f"UserProfile: {self.user.username}"  # Return a string with the user's profile information

class AdminProfile(Person):
    # Admin-specific profile extending Person
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')  # User associated with this admin profile
    admin_level = models.CharField(max_length=50)  # Additional field for admin level

    def __str__(self):
        return f"AdminProfile: {self.user.username} (Level: {self.admin_level})"  # Return a string with the admin's profile information

class BeachSpecificChat(models.Model):
    # Represents a chat for a specific beach
    messages = models.ManyToManyField('Message', blank=True)  # Messages related to this chat
    beach_name = models.CharField(max_length=100)  # Name of the beach for which the chat is maintained

    def __str__(self):
        return f"BeachSpecificChat for Beach: {self.beach_name}"  # Return a string describing the chat

class Message(models.Model):
    # Represents a message in a chat
    sender = models.CharField(max_length=100)  # Sender of the message
    content = models.TextField()  # Content of the message

    def __str__(self):
        return f"Message by {self.sender}"  # Return a string with the sender's name
