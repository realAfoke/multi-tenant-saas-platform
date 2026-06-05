from django.urls import path
from . import views


urlpatterns=[
        path('api/workspaces/',views.UserWorkSpaces.as_view(),name='create_workspace'),
        path('api/workspace/',views.CreateWorkSpace.as_view(),name='workspace_view'),
        path('api/workspace/<int:pk>/',views.WorkSpaceDetail.as_view(),name='workspace_detail'),
        path('api/projects/',views.Project.as_view(),name='project_view'),
        path('api/project/<int:pk>/',views.ProjectDetail.as_view(),name='project_detail'),
        path('api/tasks/',views.Task.as_view(),name='task_view'),
        path('api/task/<int:pk>/',views.TaskDetail.as_view(),name='task_detail'),
        path('api/comment/',views.Comment.as_view(),name='comment_view'),
        path('api/invite/',views.ProcessInvite.as_view(),name='procees_invite'),
        path('api/invite/<str:token>/<int:pk>/',views.ProcessInvite.as_view(),name='process_invite'),
        path('api/pending-requests/<int:wk>/',views.GetInviteRequest.as_view(),name='pending_requesst'),
        path('api/request/<int:wk>/<int:pk>/',views.AcceptInviteRequest.as_view(),name='accept_request')
        ]
