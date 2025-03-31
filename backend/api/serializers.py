from rest_framework import serializers
from django.contrib.auth.models import User
from .models import File, UserProfile, Address

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'filename', 'file_type', 'upload_date', 'size', 'user']
        read_only_fields = ['file_type', 'user']  # These will be set in perform_create

    def create(self, validated_data):
        # Associate the file with the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'postal_code', 'country', 'is_default']
        read_only_fields = ['user']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'phone_number']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    addresses = AddressSerializer(many=True, required=False)
    total_files = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile', 'addresses', 'total_files']
        read_only_fields = ['email']
    
    def get_total_files(self, obj):
        return obj.files.count()
    

