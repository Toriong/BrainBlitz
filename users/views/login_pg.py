from django.shortcuts import render
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt 


# the landing page will have sign in modal:
# -it will have login info for the user to input 
# -on that modal, the user can be linked to this page to create their account
# -the create account page will have the following: 
#   -the ability for the user to fill ot a form 
#   -the ability for the user to chooose the following login:
#       -google login
#       -linkedin login 

@csrf_exempt 
def render_create_account_pg(request:HttpRequest):
    return render(request, 'user/createAccount.html')
    