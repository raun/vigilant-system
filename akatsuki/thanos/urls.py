from thanos import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('user/all', views.FeatureRequestsListAll.as_view()),
    path('user/', views.FeatureRequests.as_view()),
    path('', views.FeatureRequestCreate.as_view()),
    path('<int:pk>', views.FeatureRequestsDetail.as_view()),
    path('<int:feature_request_id>/response', views.FeatureRequestsResponseDetail.as_view()),
    path('relation', views.UserActionsCreate.as_view()),
    path('<int:feature_request_id>/comments', views.CommentsList.as_view()),
    path('comments', views.CommentsCreate.as_view()),
    path('comments/<int:comment_id>', views.CommentsDetail.as_view()),
    path('comments/<int:comment_id>/like', views.UserActionCommentCreate.as_view()),
    path("<int:feature_request_id>/watch", views.UserActionsCreate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
