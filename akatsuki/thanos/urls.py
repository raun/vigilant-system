from thanos import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.FeatureRequestsListAll.as_view()),
    path('user/<int:user_id>', views.FeatureRequestsList.as_view()),
    path('<int:pk>', views.FeatureRequestsDetail.as_view()),
    path('<int:feature_request_id>/response', views.FeatureRequestsResponseDetail.as_view()),
    path('<int:feature_request_id>/comments/all', views.CommentsList.as_view()),
    path('<int:feature_request_id>/comments', views.CommentsCrud.as_view()),
    path("<int:feature_request_id>/watch", views.UserActionsCreate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
