
def create_work_space(request,serializer):
    serializer.is_valid(raise_exception=True)
    serializer.save(super_admin=request.user)
    return serializer.data


