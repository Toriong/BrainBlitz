from django.http import JsonResponse


def get_error_response(error: Exception, err_msg: str, data: dict = {}):
    status_code = 500
             
    if (error.__dict__.get('error_code') != None) and (error.__dict__.get('error_code') != 500):
        status_code = error.__dict__['error_code']
                
    response = JsonResponse({ "msg": err_msg, **data })
    response.status_code = status_code

    return response