from rest_framework import serializers
from .models import Beach, Weather, WaterQuality, CommunityReport, UserProfile, AdminProfile, BeachSpecificChat, Message


class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ['temperature', 'windSpeed', 'humidity', 'forecast']

class WaterQualitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterQuality
        fields = ['phLevel', 'pollutionLevel', 'isSafe']

class BeachSerializer(serializers.ModelSerializer):
    weather = WeatherSerializer()
    waterQuality = WaterQualitySerializer()

    class Meta:
        model = Beach
        fields = ['name', 'location', 'amenities', 'weather', 'waterQuality']

    def create(self, validated_data):
        weather_data = validated_data.pop('weather')
        water_quality_data = validated_data.pop('waterQuality')
        
        weather = Weather.objects.create(**weather_data)
        water_quality = WaterQuality.objects.create(**water_quality_data)
        
        beach = Beach.objects.create(weather=weather, waterQuality=water_quality, **validated_data)
        
        return beach

class CommunityReportSerializer(serializers.ModelSerializer):
    beach = BeachSerializer()  # Nested serializer for Beach

    class Meta:
        model = CommunityReport
        fields = ['user', 'reportType', 'beach', 'problemType', 'status', 'additionalInfo', 'urgency']

    def create(self, validated_data):
        beach_data = validated_data.pop('beach')
        beach, created = Beach.objects.get_or_create(**beach_data)
        report = CommunityReport.objects.create(beach=beach, **validated_data)
        return report

    def update(self, instance, validated_data):
        beach_data = validated_data.pop('beach', None)
        if beach_data:
            beach, created = Beach.objects.get_or_create(**beach_data)
            instance.beach = beach
        
        instance.user = validated_data.get('user', instance.user)
        instance.reportType = validated_data.get('reportType', instance.reportType)
        instance.problemType = validated_data.get('problemType', instance.problemType)
        instance.status = validated_data.get('status', instance.status)
        instance.additionalInfo = validated_data.get('additionalInfo', instance.additionalInfo)
        instance.urgency = validated_data.get('urgency', instance.urgency)
        instance.save()
        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'bio', 'user']

class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'bio', 'admin_level', 'user']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'content']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'content']

class BeachSpecificChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = BeachSpecificChat
        fields = ['beach_name', 'messages']

    def create(self, validated_data):
        messages_data = validated_data.pop('messages')
        beach_name = validated_data.get('beach_name')
        
        # Try to find an existing chat with the same beach_name
        beach_chat, created = BeachSpecificChat.objects.get_or_create(beach_name=beach_name)
        
        # If the chat already exists, append the new messages
        for message_data in messages_data:
            message = Message.objects.create(**message_data)
            beach_chat.messages.add(message)
        
        return beach_chat