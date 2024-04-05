from django.contrib import admin
from django.urls import path, include
from .views.game import handle_game_display_view
from .views.main_menu import render_main_menu_pg

# build a landing page if the game gets any traction

urlpatterns = [
    path('', render_main_menu_pg),
    path('game', handle_game_display_view),   
    path('how-to-play', handle_game_display_view),   
]       
