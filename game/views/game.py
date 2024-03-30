from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def handle_game_display_view(request: HttpRequest) -> HttpResponse:
    print('request: ', request)
    
    return render(request, 'game/index.html')    