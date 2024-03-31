from typing import Literal
from ..errors import CustomError

TNavbarGetterFns = Literal[
    'generate_main_menu_nav',
]

class Navbar:
    nav_bar: str
    
    def generate_main_menu_nav():
        return '''
            <div id="navbar">
            
            </div>
        '''

    def get_getter_fns(self):
        return [
            self.generate_main_menu_nav
        ]
    
    def __init__(self, fn_name: TNavbarGetterFns) -> None:
        try:
            fns = self.get_getter_fns()
            nav_bar = [fn for fn in fns if fn.__name__ == fn_name]

            if len(nav_bar) == 0:
                raise CustomError(f'The value for "fn_name" is invalid. Received: {fn_name}.', 500)

            nav_bar_fn = nav_bar[0]
            nav_bar_str = nav_bar_fn()

            print('nav_bar_str: ', nav_bar_str)

            # self.nav_bar = nav_bar[0]()
        except ValueError as error:
            print('Failed to get nav str. Reason: ', error)
        