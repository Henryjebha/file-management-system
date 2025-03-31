from django.contrib import admin
from .models import File, UserProfile, Address

admin.site.register(File)
admin.site.register(UserProfile)
admin.site.register(Address)