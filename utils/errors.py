
class CustomError(Exception):
    error_code:int
    response_to_error:str
    
    def __init__(self, 
        msg: str, 
        error_code: int, 
        response_to_error: str | None = None
    ):
        if response_to_error:
            self.response_to_error = response_to_error

        super().__init__(msg)
        self.error_code = error_code