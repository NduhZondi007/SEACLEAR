from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Beach, Weather, WaterQuality, CommunityReport, AdminProfile, BeachSpecificChat, Message,EducationalContent

class WeatherSerializer(serializers.ModelSerializer):
    # Serializer for the Weather model
    class Meta:
        model = Weather
        fields = ['temperature', 'windSpeed', 'humidity', 'seaLevel', 'forecast']

class WaterQualityCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterQuality
        fields = ['phLevel', 'pollutionLevel']  # Exclude 'isSafe' from input

class WaterQualityOutputSerializer(serializers.ModelSerializer):
    isSafe = serializers.CharField()  # Include 'isSafe' in the output

    class Meta:
        model = WaterQuality
        fields = ['phLevel', 'pollutionLevel', 'isSafe']

class BeachSerializer(serializers.ModelSerializer):
    # Serializer for the Beach model
    weather = WeatherSerializer()  # Nested serializer for Weather
    waterQuality = WaterQualityCreateUpdateSerializer()  # Use CreateUpdateSerializer for nested WaterQuality

    class Meta:
        model = Beach
        fields = ['id', 'name', 'location', 'latitude', 'longitude', 'amenities', 'weather', 'waterQuality']  # Fields to be included in the serialized output

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
                for attr, value in weather_data.items():
                    setattr(weather, attr, value)
                weather.save()
            else:
                weather = Weather.objects.create(**weather_data)
                instance.weather = weather

        water_quality_data = validated_data.pop('waterQuality', None)
        if water_quality_data:
            water_quality = instance.waterQuality
            if water_quality:
                for attr, value in water_quality_data.items():
                    setattr(water_quality, attr, value)
                water_quality.save()
            else:
                water_quality = WaterQuality.objects.create(**water_quality_data)
                instance.waterQuality = water_quality

        instance.name = validated_data.get('name', instance.name)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.location = validated_data.get('location', instance.location)
        instance.amenities = validated_data.get('amenities', instance.amenities)
        
        instance.save()
        return instance

    def to_representation(self, instance):
        # Customize the representation of the instance to include the 'isSafe' field in the nested WaterQuality
        representation = super().to_representation(instance)
        water_quality_serializer = WaterQualityOutputSerializer(instance.waterQuality)
        representation['waterQuality'] = water_quality_serializer.data
        return representation

class CommunityReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityReport
        fields = ['id', 'user', 'reportType', 'beach', 'problemType', 'status', 'additionalInfo', 'urgency']  # Fields to be included in the serialized output
    

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'likeCount', 'likedBy']

class BeachSpecificChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = BeachSpecificChat
        fields = ['beach_name', 'messages']

    def create(self, validated_data):
        messages_data = validated_data.pop('messages')
        beach_chat, created = BeachSpecificChat.objects.get_or_create(beach_name=validated_data.get('beach_name'))

        for message_data in messages_data:
            message = Message.objects.create(**message_data)
            beach_chat.messages.add(message)
        
        return beach_chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class AdminProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = AdminProfile
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        admin_profile, created = AdminProfile.objects.get_or_create(user=user)
        return admin_profile
    
class EducationalContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalContent
        fields = '__all__'