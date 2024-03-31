from django.contrib import admin
from django.urls import path, include
from .views.login_pg import render_create_account_pg
from .views.google_auth_receiver import handle_google_auth_creds_receiver
from .views.user_home_pg import render_user_home_pg

# when the user creates an account, get the following from the user:
# their country of origin 
# their username

urlpatterns = [
    path('/create-account', render_create_account_pg),
    path('google-auth-cred-receiver', handle_google_auth_creds_receiver),
    path('<str:user_id>/', render_user_home_pg, name='user_home')
]       
