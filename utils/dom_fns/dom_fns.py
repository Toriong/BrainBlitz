from typing import Literal
from ..errors import CustomError

TNavbarGetterFns = Literal[
    'main_menu',
]

def generate_main_menu_navbar():
    return """
        <nav id='navbar'>
        
        </nav>
    """

def get_navbar(nav_bar_name: TNavbarGetterFns, navbar_child_element_str = None):
    try: 
        nav_bar_dict = {
            "main_menu": generate_main_menu_navbar
        }
        
        nav_bar_fn = nav_bar_dict[nav_bar_name]
        
        if not nav_bar_fn:
            raise CustomError(f'"{nav_bar_name}" does not exist.', 500)
        
        return nav_bar_fn
    except Exception as error:
        print('Failed to get the target navbar. Reason: ', error)

        return None