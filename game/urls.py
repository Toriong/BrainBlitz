from django.contrib import admin
from django.urls import path, include
from .views.game import handle_game_display_view


urlpatterns = [
    path('', handle_game_display_view),
    
]       
