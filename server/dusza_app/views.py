from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

# Create your views here.

@ensure_csrf_cookie
def get_csrf(request, *args, **kwargs):
    return JsonResponse({
        "message": "OK"
    })

