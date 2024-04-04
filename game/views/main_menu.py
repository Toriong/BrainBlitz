from django.shortcuts import render
from django.http import HttpRequest
from utils.dom_fns.dom_fns import get_navbar

def render_main_menu_pg(request: HttpRequest):
    navbar = get_navbar("main_menu")
    
    return render(request, 'game/mainMenu.html', {
        'nav_bar': navbar
    })