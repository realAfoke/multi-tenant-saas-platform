from django.contrib import admin
from . import models
# Register your models here.


admin.site.register(models.WorkSpace)
admin.site.register(models.Project)
admin.site.register(models.Task)
admin.site.register(models.Comment)
admin.site.register(models.InviteToken)
admin.site.register(models.InviteTokenAuditLog)
admin.site.register(models.InviteRequest)
