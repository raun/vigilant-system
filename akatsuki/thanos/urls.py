from thanos import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('user/all', views.FeatureRequestsListAll.as_view()),
    path('user/', views.FeatureRequests.as_view()),
    path('', views.FeatureRequestCreate.as_view()), # check this one here
    path('<int:feature_request_id>', views.FeatureRequestDelete.as_view()),
    path('<int:pk>', views.FeatureRequestsDetail.as_view()),
    path('<int:feature_request_id>/response', views.FeatureRequestsResponseDetail.as_view()),
    path('/upvote', views.CreateWatchView.as_view()), # change this
    path('<int:feature_request_id>/user/<int:user_id>/downvote', ), # delete request
    path('<int:feature_request_id>/comments', views.CommentsList.as_view()),
    path('comments', views.CommentsCreate.as_view()),
    path('comments/<int:comment_id>', views.CommentsDetail.as_view()),
    path('comments/like', views.LikeCommentView.as_view()),
    path('comments/<int:comment_id>/user/<int:user_id>/unlike', views.UnlikeCommentView.as_view()),
    path("/watch", views.CreateWatchView.as_view()), # change this
    path("<int:feature_request_id>/<int:user_id>/unwatch", views.DeleteWatchView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
