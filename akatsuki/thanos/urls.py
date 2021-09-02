from thanos import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('user/all', views.FeatureRequestsListAll.as_view()),
    path('user/', views.FeatureRequests.as_view()),
    path('', views.FeatureRequestCreate.as_view()), # check this one here
    path('<int:feature_request_id>/delete', views.FeatureRequestDelete.as_view()), # this is the delete endpoint for FRs
    path('<int:pk>', views.FeatureRequestsDetail.as_view()), # this is the retrieve detail endpoint
    path('<int:feature_request_id>/response', views.FeatureRequestsResponseDetail.as_view()), # get the admin's response to the FR submission
    path('upvote', views.UpvoteView.as_view()), # upvote an FR
    path('<int:feature_request_id>/user/<int:user_id>/downvote', views.DownVoteView.as_view()), # Downvote an FR
    path('<int:feature_request_id>/comments', views.CommentsList.as_view()), # get all comments under a FR
    path('comments', views.CommentsCreate.as_view()), # create a comment
    path('comments/<int:comment_id>', views.CommentsDetail.as_view()), # comment detail
    path('comments/like', views.LikeCommentView.as_view()), # like a comment
    path('comments/<int:comment_id>/user/<int:user_id>/unlike', views.UnlikeCommentView.as_view()), # unlike a comment
    path("watch", views.CreateWatchView.as_view()), # Watch an FR
    path("<int:feature_request_id>/<int:user_id>/unwatch", views.DeleteWatchView.as_view()), # unwatch an FR
]

urlpatterns = format_suffix_patterns(urlpatterns)
