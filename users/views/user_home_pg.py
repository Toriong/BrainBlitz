from django.http import HttpRequest
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def render_user_home_pg(request:HttpRequest, user_id: str) -> HttpResponse:
    print('request: ', request)
    print('user_id: ', user_id)
    
    # if the user is not the owner of their home page, reject their ability to edit their home page
    
    # give the user the abililty to edit their info on their home page
    return render(request, 'user/userHomePg.html')