from collections import Set

from rest_framework.serializers import ModelSerializer, Serializer, ListSerializer
from rest_framework import serializers

from thanos.models import FeatureRequest, Comment, UserActionsFR, FeatureRequestResponse


class FeatureRequestSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'


# class FeatureRequestSerializer(Serializer):
#     def create(self, validated_data):
#         pass
#
#     def update(self, instance, feature_request):
#         instance.id = feature_request.get('id')
#         instance.title = feature_request.get('title')
#         instance.tags = feature_request.get('tags')
#         instance.likes = feature_request.get('likes')
#         instance.user_id = feature_request.get('user_id')
#         instance.watching = feature_request.get('watching')
#         # user_id = validated_data.get('user_id')
#         # user_watching_q =
#         # UserActionsFR.objects.filter(user__id=user_id).filter(action_type=3).values('feature_request')
#         # likes = len(UserActionsFR.objects.filter(action_type=1))
#         # feature_requests_all = FeatureRequest.objects.all().values('id', 'title', 'tags')
#         # watching_set = set()
#         # for watch in user_watching_q:
#         #     watching_set.add(watch)
#         # for feature_request in feature_requests_all:
#         #     instance.id = feature_request.get('id')
#         #     instance.title = feature_request.get('title')
#         #     instance.tags = feature_request.get('tags')
#         #     instance.likes = likes
#         #     instance.user_id = user_id
#         #     if feature_request.get('id') in watching_set:
#         #         instance.watching = True
#         #     else:
#         #         instance.watching = False
#         return instance
#
#     def is_valid(self, raise_exception=False):
#         if self.user_id is None:
#             return False
#         return True
#
#     id = serializers.IntegerField()
#     title = serializers.CharField(max_length=200)
#     tags = serializers.CharField(max_length=40)
#     watching = serializers.BooleanField()
#     likes = serializers.IntegerField()
#     user_id = serializers.IntegerField()
#
#     class Meta:
#         readable_fields = 'user_id'
#         writeable_fields = ('watching', 'likes', 'id', 'title', 'tags')
#

class FeatureRequestsListSerializer(Serializer):
    user_id = serializers.IntegerField()
    feature_requests = serializers.ListField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        user_id = validated_data.get('user_id')
        user_watching_q = UserActionsFR.objects.filter(user__id=user_id).filter(action_type=3).values('feature_request')
        likes = len(UserActionsFR.objects.filter(action_type=1))
        feature_requests_all = FeatureRequest.objects.all().values('id', 'title', 'tags')
        watching_set = set()
        for watch in user_watching_q:
            watching_set.add(watch)
        for feature_request in feature_requests_all:
            fr_instance = feature_request
            fr_instance['likes'] = likes
            instance.user_id = user_id
            if feature_request.get('id') in watching_set:
                fr_instance['watching'] = True
            else:
                fr_instance['watching'] = False
            instance['feature_requests'].append(FeatureRequestSerializer(instance=fr_instance))
        return instance

    class Meta:
        readable_fields = 'user_id'
        writeable_fields = 'feature_requests'


class FeatureRequestResponseSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequestResponse
        fields = '__all__'


class UserActionsSerializer(ModelSerializer):
    class Meta:
        model = UserActionsFR
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

