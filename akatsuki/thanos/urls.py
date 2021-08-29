from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
import views

url_patterns = [
    path('feature-requests/', views.FeatureRequestsList),
    path('feature-requests/<int:id>', views.FeatureRequestsDetail)
]

url_patterns = format_suffix_patterns(url_patterns)
