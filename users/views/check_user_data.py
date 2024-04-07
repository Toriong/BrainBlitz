from django.http import HttpRequest, JsonResponse 
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from utils.errors import CustomError
from ..models import UserModel
from utils.general_fns import get_error_response
import json

@csrf_exempt
def handle_check_user_data_path(request: HttpRequest):
    try: 
        query = request.GET.get("query")
        query = json.load(query) if query else query
        
        if not query:
            raise CustomError('Query parameter is not found in the request.', 400)

        total_users = UserModel.objects.filter(Q(query)).count()        
        
        return JsonResponse({ "total_users": total_users })
    except Exception as error:
        print(error)
        err_msg = f"Failed to check if data exist in the database. Reason: {error}"
        err_response = get_error_response(error, err_msg,{})
        
        return err_response