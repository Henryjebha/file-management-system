from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Address(models.Model):
    user = models.ForeignKey(User, related_name='addresses', on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

class File(models.Model):
    FILE_TYPES = (
        ('pdf', 'PDF'),
        ('xlsx', 'Excel'),
        ('docx', 'Word'),
        ('txt', 'Text'),
        ('other', 'Other'),
    )
    
    user = models.ForeignKey(User, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=10, choices=FILE_TYPES)
    upload_date = models.DateTimeField(default=timezone.now)
    size = models.IntegerField()  # Size in bytes
    
    def __str__(self):
        return self.filename
    
    def save(self, *args, **kwargs):
        # Auto-detect file type if not provided
        if not self.file_type:
            ext = self.filename.split('.')[-1].lower()
            if ext == 'pdf':
                self.file_type = 'pdf'
            elif ext in ['xlsx', 'xls']:
                self.file_type = 'xlsx'
            elif ext in ['docx', 'doc']:
                self.file_type = 'docx'
            elif ext == 'txt':
                self.file_type = 'txt'
            else:
                self.file_type = 'other'
        super().save(*args, **kwargs)