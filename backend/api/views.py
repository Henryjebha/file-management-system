from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from django.db.models import Count
from django.contrib.auth.models import User
from .models import File, UserProfile, Address
from .serializers import FileSerializer, UserSerializer, UserProfileSerializer, AddressSerializer

class FileViewSet(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own files
        return File.objects.filter(user=self.request.user).order_by('-upload_date')
    
    def perform_create(self, serializer):
        uploaded_file = self.request.FILES.get('file')
        if not uploaded_file:
            raise ValidationError({'file': 'No file was submitted'})
        
        # Get filename from form data or use the original filename
        filename = self.request.data.get('filename', uploaded_file.name)
        
        # Determine file type from extension
        ext = filename.split('.')[-1].lower() if '.' in filename else ''
        file_type = 'other'
        if ext == 'pdf':
            file_type = 'pdf'
        elif ext in ['xlsx', 'xls']:
            file_type = 'xlsx'
        elif ext in ['docx', 'doc']:
            file_type = 'docx'
        elif ext == 'txt':
            file_type = 'txt'
        
        # Get size from form data or file object
        try:
            size = int(self.request.data.get('size', 0)) or uploaded_file.size
        except (ValueError, TypeError):
            size = uploaded_file.size
        
        # Create the file object
        serializer.save(
            user=self.request.user,
            file=uploaded_file,
            filename=filename,
            file_type=file_type,
            size=size
        )
    
    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        # Get total files uploaded by user
        total_files = File.objects.filter(user=request.user).count()
        
        # Get breakdown by file type
        file_types = File.objects.filter(user=request.user).values('file_type').annotate(
            count=Count('file_type')
        )
        
        return Response({
            'total_files': total_files,
            'file_types': file_types
        })

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only access their own profile
        return User.objects.filter(id=self.request.user.id)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['patch'])
    def update_username(self, request):
        user = request.user
        username = request.data.get('username')
        
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.username = username
        user.save()
        
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        # If this is set as default, unset other defaults
        if serializer.validated_data.get('is_default'):
            Address.objects.filter(
                user=self.request.user,
                is_default=True
            ).exclude(id=serializer.instance.id).update(is_default=False)

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['patch'])
    def update_phone(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        phone_number = request.data.get('phone_number')
        if phone_number:
            profile.phone_number = phone_number
            profile.save()
        
        serializer = self.get_serializer(profile)
        return Response(serializer.data)