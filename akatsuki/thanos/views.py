from thanos import models, serializers
from rest_framework import generics, mixins

# Create your views here.


class FeatureRequestsList(generics.CreateAPIView, generics.ListAPIView):
    lookup_url_kwarg = 'user_id'
    serializer_class = serializers.FeatureRequestSerializer

    def get_queryset(self):
        user_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.FeatureRequest.objects.filter(creator__id=user_id)


class FeatureRequestsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FeatureRequest.objects.all()
    serializer_class = serializers.FeatureRequestSerializer


class FeatureRequestsResponseDetail(generics.RetrieveAPIView):
    lookup_url_kwarg = 'feature_request_id'
    serializer_class = serializers.FeatureRequestResponseSerializer

    def get_queryset(self):
        feature_request_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.FeatureRequestResponse.objects.filter(id=feature_request_id)


class UserActionsCreate(generics.CreateAPIView):
    queryset = models.UserActionsFR.objects.all()
    serializer_class = serializers.UserActionsSerializer


class CommentsCrud(generics.CreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer


class CommentsList(generics.ListAPIView):
    lookup_url_kwarg = 'feature_request_id'
    serializer_class = serializers.CommentSerializer

    def get_queryset(self):
        feature_request_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.Comment.objects.filter(feature_request__id=feature_request_id)


#class Replies
