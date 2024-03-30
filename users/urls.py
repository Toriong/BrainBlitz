from django.contrib import admin
from django.urls import path, include
from .views.login_pg import render_create_account_pg


urlpatterns = [
    path('create-account', render_create_account_pg),
    
]       
