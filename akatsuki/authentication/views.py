from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


class SignInView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        users = User.objects.filter(email=email)
        if len(users) > 1:
            return Response({'message': 'Internal server error'}, status=502)
        else:
            user = users.values().get(0)
            if user.check_password(password):
                return Response({'user_id': user.id})
            else:
                return Response({'message': 'incorrect password'}, status=401)


class SignUpView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        if len(User.objects.filter(email=email).values()) > 0:
            return Response({'message': 'This email is already in use'}, status=400)
        user = User()
        user.email = email
        user.set_password(password)
        user.save()
        return Response({'id': user.id})
