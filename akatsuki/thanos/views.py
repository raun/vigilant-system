from rest_framework.response import Response

from thanos import models, serializers
from rest_framework import generics, mixins
from rest_framework.views import APIView

# Create your views here.


def get_response(watching_frs, all_frs, user_id):
    display_frs = []
    for fr in all_frs:
        fr1 = fr
        fr1['watching'] = (fr.get('id') in watching_frs)
        fr1['likes'] = len(models.UserActionsFR.objects.filter(action_type=1).filter(user__id=user_id).values('id'))
        display_frs.append(fr1)
    return Response(display_frs)


class FeatureRequestsListAll(APIView):

    def get(self, request):
        user_id = request.data.get('user_id')
        feature_requests = models.FeatureRequest.objects.all().values()
        relations = models.UserActionsFR.objects.select_related('feature_requests').filter(user__id=user_id)\
            .filter(action_type=3).values('feature_request')
        relations_set = set()
        for relation in relations:
            relations_set.add(relation.get('feature_request'))
        return get_response(relations_set, feature_requests, user_id)


# class FeatureRequestsList(generics.CreateAPIView, generics.ListAPIView):
#     lookup_url_kwarg = 'user_id'
#     serializer_class = serializers.FeatureRequestsBasicListSerializer
#
#     def get_queryset(self):
#         user_id = self.kwargs.get(self.lookup_url_kwarg)
#         owned = models.FeatureRequest.objects.filter(creator__id=user_id)
#         watching = models.FeatureRequest.objects.
#         filter(id__in=models.UserActionsFR.objects.filter(user__id=user_id).filter(action_type=3).values('feature_request'))
#         return owned.union(watching)


class FeatureRequests(APIView):
    def get(self, request):
        user_id = request.data.get('user_id')
        feature_requests = models.FeatureRequest.objects.filter(creator__id=user_id).values()
        relations = models.UserActionsFR.objects.select_related('feature_requests').filter(user__id=user_id)\
            .filter(action_type=3).values('feature_request')
        relations_set = set()
        for relation in relations:
            relations_set.add(relation.get('feature_request'))
        return get_response(relations_set, feature_requests, user_id)


class FeatureRequestsCrud(generics.CreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FeatureRequest.objects.all()
    serializer_class = serializers.FeatureRequestSerializer



# class FeatureRequestsDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.FeatureRequest.objects.all()
#     serializer_class = serializers.FeatureRequestsBasicListSerializer



class FeatureRequestsResponseDetail(generics.RetrieveAPIView):
    lookup_url_kwarg = 'feature_request_id'
    serializer_class = serializers.FeatureRequestResponseSerializer

    def get_queryset(self):
        feature_request_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.FeatureRequestResponse.objects.filter(id=feature_request_id)


class UserActionsCreate(generics.CreateAPIView, generics.RetrieveDestroyAPIView):
    queryset = models.UserActionsFR.objects.all()
    serializer_class = serializers.UserActionsSerializer

    # def get_queryset(self):
    #     feature_request_id = self.kwargs.get(self.lookup_url_kwarg)
    #     return models.UserActionsFR.objects.filter(feature_request__id=feature_request_id)


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
