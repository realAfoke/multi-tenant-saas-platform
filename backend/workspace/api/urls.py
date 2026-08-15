from django.urls import path
from . import views


urlpatterns=[
                ## create endpoint
        path('<int:pk>/role/',views.RoleView.as_view(),name='role_view'),
        path('dashboard/<int:wk>/',views.DashBoard.as_view(),name='dashboard_view'),
        path('',views.WorkSpace.as_view(),name='workspace_view'),
        path('<int:wk>/projects/',views.Project.as_view(),name='project_view'),
        path('<int:wk>/<int:pk>/tasks/',views.Task.as_view(),name='task_view'),

        #resource detail enpoint
        path('<int:wk>/',views.WorkSpaceDetail.as_view(),name='workspace_detail'),
        path('<int:wk>/project/<int:pk>/',views.ProjectDetail.as_view(),name='project_view'),
        path('<int:wk>/<int:pk>/task/<int:tk>/',views.TaskDetail.as_view(),name='task_detail'),
        path('<int:wk>/members/',views.WorkSpaceMembers.as_view(),name='member_view'),
        path('<int:wk>/invite/',views.SendInviteView.as_view(),name='send_invite'),
        path('<int:pk>/comments/',views.Comment.as_view(),name='comment_view'),
        path('<int:pk>/accept-invite/',views.AcceptInviteView.as_view(),name='accept_invite'),
        path('<int:pk>/pending-request/',views.GetInviteView.as_view(),name='pending_requesst'),
        ]
