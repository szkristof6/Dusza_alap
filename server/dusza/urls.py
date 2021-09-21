from django.contrib import admin
from django.urls import path

from dusza_app.views.authentication import login_method, register
from dusza_app.views.permission import get_csrf, checkpermission


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/GCSF', get_csrf),
    path('api/LGN', login_method),
    path('api/RGST', register),
    path('api/CSPSm', checkpermission),
    
    
    
]
