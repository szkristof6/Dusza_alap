from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

sites = [{
    "name": "index",
    "path": "/",
    "permissions": ["DIAK", "TANAR", "SZULO", "IGAZG", "TESZTELO"]
}]

@ensure_csrf_cookie
@csrf_exempt
def get_csrf(request, *args, **kwargs):
    print(request.session.items())
    return JsonResponse({"message": "OK"})

def checkpermission(request, *args, **kwargs):
    if request.method == "GET":
        if request.user.is_authenticated:
            print(request.headers)
            return JsonResponse({'permission': request.session['user']["permission"]})
        else: 
            return JsonResponse({'message': "ERROR"}, status=403)
    else:
        return JsonResponse({'message': "ERROR"}, status=200) # ha nem "POST" akkor gond van