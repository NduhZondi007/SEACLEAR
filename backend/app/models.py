from django.db import models
from django.contrib.auth.models import User

class Beach(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255, default="camps bay")
    amenities = models.JSONField(default=list)  # Storing amenities as a list of strings
    weather = models.OneToOneField('Weather', on_delete=models.SET_NULL, null=True, blank=True)
    waterQuality = models.OneToOneField('WaterQuality', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class Weather(models.Model):
    temperature = models.FloatField()
    windSpeed = models.FloatField()
    humidity = models.FloatField()
    forecast = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.forecast} - {self.temperature}°C"

class WaterQuality(models.Model):
    phLevel = models.FloatField()
    pollutionLevel = models.CharField(max_length=50)
    isSafe = models.CharField(max_length=50)

    def __str__(self):
        return f"pH: {self.phLevel}, Pollution: {self.pollutionLevel}, Safe: {self.isSafe}"

class CommunityReport(models.Model):
    user = models.CharField(max_length=100)
    reportType = models.CharField(max_length=100)
    beach = models.ForeignKey(Beach, on_delete=models.CASCADE)
    problemType = models.TextField()
    status = models.CharField(max_length=50, default="Pending")
    additionlInfo = models.TextField()
    urgency = models.TextField()

    def __str__(self):
        return f"Report by {self.user} on {self.beach.name}"

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True  # This makes Person an abstract class, so no database table will be created.

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class UserProfile(Person):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    def __str__(self):
        return f"UserProfile: {self.user.username}"

class AdminProfile(Person):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    admin_level = models.CharField(max_length=50)  # Additional field specific to admins.

    def __str__(self):
        return f"AdminProfile: {self.user.username} (Level: {self.admin_level})"

