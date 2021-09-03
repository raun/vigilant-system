from django.urls import path, include
from authentication.views import *

urlpatterns = [
    path('signin', SignInView.as_view()),
    path('signup', SignUpView.as_view())
]