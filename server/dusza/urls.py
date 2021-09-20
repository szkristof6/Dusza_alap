from django.contrib import admin
from django.urls import path

from dusza_app.views import get_csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/GCSF', get_csrf)
]
