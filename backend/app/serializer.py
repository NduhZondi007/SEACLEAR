from rest_framework import serializers
from .models import Beach, Weather, WaterQuality, CommunityReport, UserProfile, AdminProfile, BeachSpecificChat, Message

class WeatherSerializer(serializers.ModelSerializer):
    # Serializer for the Weather model
    class Meta:
        model = Weather
        fields = ['temperature', 'windSpeed', 'humidity', 'forecast']  # Fields to be included in the serialized output

class WaterQualitySerializer(serializers.ModelSerializer):
    # Serializer for the WaterQuality model
    class Meta:
        model = WaterQuality
        fields = ['phLevel', 'pollutionLevel', 'isSafe']  # Fields to be included in the serialized output

class BeachSerializer(serializers.ModelSerializer):
    # Serializer for the Beach model
    weather = WeatherSerializer()  # Nested serializer for Weather
    waterQuality = WaterQualitySerializer()  # Nested serializer for WaterQuality

    class Meta:
        model = Beach
        fields = ['id', 'name', 'location', 'amenities', 'weather', 'waterQuality']  # Fields to be included in the serialized output

    def create(self, validated_data):
        # Override create method to handle nested Weather and WaterQuality
        weather_data = validated_data.pop('weather')
        water_quality_data = validated_data.pop('waterQuality')
        
        weather = Weather.objects.create(**weather_data)
        water_quality = WaterQuality.objects.create(**water_quality_data)
        
        beach = Beach.objects.create(weather=weather, waterQuality=water_quality, **validated_data)
        
        return beach
    
    def update(self, instance, validated_data):
        # Override update method to handle nested Weather and WaterQuality
        weather_data = validated_data.pop('weather', None)
        if weather_data:
            weather = instance.weather
            if weather:
                Weather.objects.filter(pk=weather.pk).update(**weather_data)
            else:
                weather = Weather.objects.create(**weather_data)
                instance.weather = weather

        water_quality_data = validated_data.pop('waterQuality', None)
        if water_quality_data:
            water_quality = instance.waterQuality
            if water_quality:
                WaterQuality.objects.filter(pk=water_quality.pk).update(**water_quality_data)
            else:
                water_quality = WaterQuality.objects.create(**water_quality_data)
                instance.waterQuality = water_quality

        instance.name = validated_data.get('name', instance.name)
        instance.location = validated_data.get('location', instance.location)
        instance.amenities = validated_data.get('amenities', instance.amenities)
        
        instance.save()
        return instance

class CommunityReportSerializer(serializers.ModelSerializer):
    # Serializer for the CommunityReport model
    class Meta:
        model = CommunityReport
        fields = ['id', 'user', 'reportType', 'beach', 'problemType', 'status', 'additionalInfo', 'urgency']  # Fields to be included in the serialized output
    
class UserProfileSerializer(serializers.ModelSerializer):
    # Serializer for the UserProfile model
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'bio', 'user']  # Fields to be included in the serialized output

class AdminProfileSerializer(serializers.ModelSerializer):
    # Serializer for the AdminProfile model
    class Meta:
        model = AdminProfile
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'bio', 'admin_level', 'user']  # Fields to be included in the serialized output

class MessageSerializer(serializers.ModelSerializer):
    # Serializer for the Message model
    class Meta:
        model = Message
        fields = ['sender', 'content']  # Fields to be included in the serialized output

class BeachSpecificChatSerializer(serializers.ModelSerializer):
    # Serializer for the BeachSpecificChat model
    messages = MessageSerializer(many=True)  # Nested serializer for Message

    class Meta:
        model = BeachSpecificChat
        fields = ['beach_name', 'messages']  # Fields to be included in the serialized output

    def create(self, validated_data):
        # Override create method to handle nested Message data
        messages_data = validated_data.pop('messages')
        beach_name = validated_data.get('beach_name')
        
        # Try to find an existing chat with the same beach_name
        beach_chat, created = BeachSpecificChat.objects.get_or_create(beach_name=beach_name)
        
        # Create new messages and add them to the chat
        for message_data in messages_data:
            message = Message.objects.create(**message_data)
            beach_chat.messages.add(message)
        
        return beach_chat
