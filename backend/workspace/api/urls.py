from django.urls import path
from . import views


urlpatterns=[
                ## create endpoint
        path('',views.WorkSpace.as_view(),name='workspace_view'),
        path('<int:wk>/projects/',views.Project.as_view(),name='project_view'),
        path('<int:wk>/<int:pk>/tasks/',views.Task.as_view(),name='task_view'),

        #resource detail enpoint
        path('<int:wk>/',views.WorkSpaceDetail.as_view(),name='workspace_detail'),
        path('<int:wk>/project/<int:pk>/',views.ProjectDetail.as_view(),name='project_view'),
        path('<int:wk>/<int:pk>/task/<int:tk>/',views.TaskDetail.as_view(),name='task_detail'),
        path('members/<int:pk>/',views.WorkSpaceMembers.as_view(),name='member_view'),
        path('<int:pk>/comments/',views.Comment.as_view(),name='comment_view'),
        path('<int:pk>/invite/',views.send_invite,name='procees_invite'),
        path('invite/<str:token>/<int:pk>/',views.accept_invite_fun,name='process_invite'),
        path('<int:pk>/pending-request/',views.GetInviteRequest.as_view(),name='pending_requesst'),
        path('<int:pk>/accept/<int:invite_pk>/',views.AcceptInviteRequest.as_view(),name='accept_request'),
        ]
