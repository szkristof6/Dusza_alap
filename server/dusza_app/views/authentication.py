from django.http import JsonResponse
from django.contrib.auth import authenticate, login, user_logged_out
from django.contrib.auth.models import User
import json


def register(request, *args, **kwargs):
    if request.method == "POST":

        if not request.POST["username"] or not request.POST["password"]:
            return JsonResponse({"message": "Adj meg minden mezőt!"})
        else:
            username = request.POST["username"]
            password = request.POST["password"]

            try:
                user = User.objects.create_user(username, "example@szlgbp.hu", password)
                return JsonResponse({"message": "OK"})
            except:
                return JsonResponse({"message": f"Hiba történt"}, status=500)

    return JsonResponse({"message": "ERROR"}, status=200)


def login_method(request, *args, **kwargs):
    if request.method == "POST":  # Ha "POST" request érkezik
        object = json.load(request)

        username = object["username"]
        password = object["password"]

        if not username or not password:  # meg van adva a jelszó és felhasználónév
            return JsonResponse(
                {"message": "Adj meg minden mezőt!"}
            )  # ellenkező esetben írd ki hogy gond van.
        else:  # másesetben
            user = authenticate(
                username=username, password=password
            )  # Létrehozzuk az user methodust, ez a django beépített cucca, kell neki egy felh. név és egy jelszó

            if user is not None:  # Ha nem nem az user
                login(request, user)  # akkor lépjen be

                request.session["user"] = {
                    "username": username,
                    "password": password,
                    "permission": "DIAK",
                }

                return JsonResponse({"message": "OK"})  # válaszoljon

            else:  # ha nem az user
                return JsonResponse(
                    {"message": "Nincs ilyen felhasználó!"}
                )  # válaszoljon

    return JsonResponse(
        {"message": "ERROR"}, status=200
    )  # ha nem "POST" akkor gond van
