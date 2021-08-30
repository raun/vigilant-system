from thanos import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.FeatureRequestsList.as_view()),
    path('<int:id>', views.FeatureRequestsDetail.as_view()),
    path('<int:feature_request_id>/response', views.FeatureRequestsResponseDetail.as_view()),
    path('<int:feature_request_id>/comments', views.CommentsList.as_view()),
    path('<int:feature_request_id>/comment', views.CommentsCrud.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
