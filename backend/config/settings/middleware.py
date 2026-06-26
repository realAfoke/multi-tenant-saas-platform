
import logging

logger=logging.getLogger()

class RequestLogMiddleware:
    def __init__(self,get_response) -> None:
        self.get_response=get_response

    def __call__(self,request):
        logger.info("%s %s",request.method,request.get_full_path())
        response=self.get_response(request)

        logger.info("%s %s",request.method,request.get_full_path(),response.status_code)
        return response
