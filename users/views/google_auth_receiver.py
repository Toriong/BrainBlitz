from brainblitzapp.settings import GOOGLE_CLIENT_ID
from django.http import HttpRequest, HttpResponse 
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests

@csrf_exempt
def handle_google_auth_creds_receiver(request: HttpRequest):
    """
    Google calls this URL after the user has signed in with their Google account.
    """
    print('hey there!')
    token = request.POST['credential']

    try:
        user_data = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=500
        )
        
        # save the user's data into the databse via their email:
        # login_type: 'google' | 'custom'
        # email: email is required
        
        print('user_data: ', user_data)

        print('request.session, hey there! ', request.session)


        # create the user into the database

        request.session['user_data'] = user_data

        req_uri = request.build_absolute_uri()
        req_uri_splitted = req_uri.split('/')
        req_uri_splitted = ['//' if val == '' else val  for val in req_uri_splitted]
        domain_and_protocal = ''.join(req_uri_splitted[:3])
        redirect_url = f'{domain_and_protocal}/user/{123}'

        return redirect(redirect_url)
    except ValueError as error:
        print('Failed to authenticate the user with google. Reason: ', error)

        return HttpResponse(status=403)
    # In a real app, I'd also save any new user here to the database. See below for a real example I wrote for Photon Designer.
    # You could also authenticate the user here using the details from Google (https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in)

    # redirect the user to their home page