from django.shortcuts import render
from rest_framework.views import APIView
import models
import serializers
from rest_framework import generics, mixins

# Create your views here.


class FeatureRequestsList(generics.ListCreateAPIView):
    queryset = models.FeatureRequest.objects.all()
    serializer_class = serializers.FeatureRequestSerializer


class FeatureRequestsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FeatureRequest.objects.all()
    serializer_class = serializers.FeatureRequestSerializer


class FeatureRequestsResponseDetail(generics.GenericAPIView):
    lookup_url_kwarg = 'feature_request_id'
    serializer_class = serializers.FeatureRequestResponseSerializer

    def get_queryset(self):
        feature_request_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.FeatureRequestResponse.objects.filter(id=feature_request_id)
