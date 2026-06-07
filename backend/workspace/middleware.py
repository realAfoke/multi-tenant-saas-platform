# from workspace.models import WorkSpace
# from rest_framework.exceptions import ValidationError
#
#
#
# class WorkSpaceMiddleware:
#
#
#     def __init__(self,get_response):
#         self.get_response=get_response
#
#     def __call__(self,request):
#         response=self.get_response(request)
#         return response
#     def process_view(self,request,view_func,view_args,view_kwargs):
#         try:
#             if hasattr(view_func,'view_class'):
#                 view_name=view_func.view_class.__name__
#             else:
#                 view_name=view_func.__name__
#             workspace=WorkSpace.objects.get(id=view_kwargs.get('pk'))
#             if (not workspace.super_admin == request.user or workspace.admin == request.user) and 'Detail' in view_name:
#                 raise ValidationError('you dont have permission to perform this operation')
#         except WorkSpace.DoesNotExist:
#             raise ValidationError('invalid operation')

