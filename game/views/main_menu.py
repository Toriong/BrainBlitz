from django.shortcuts import render
from django.http import HttpRequest
from utils.dom_fns.dom_fns import get_navbar

def render_main_menu_pg(request: HttpRequest):
    nav_bar_str = get_navbar("main_menu")

    # if failed to get the navbar, then show the error screen
    
    return render(request, 'game/mainMenu.html', {
        'nav_bar': nav_bar_str
    })