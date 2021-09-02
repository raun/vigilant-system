from rest_framework.serializers import ModelSerializer, Serializer, ListSerializer
from rest_framework import serializers

from thanos.models import FeatureRequest, Comment, UserActionsFR, FeatureRequestResponse

class FeatureRequestsBasicListSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'


class FeatureRequestSerializer(Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def is_valid(self, raise_exception=False):
        if self.user_id is None:
            return False
        return True

    id = serializers.IntegerField()
    title = serializers.CharField(max_length=200)
    watching = serializers.BooleanField()
    likes = serializers.IntegerField()
    user_id = serializers.IntegerField()

    class Meta:
        readable_fields = 'user_id'
        writeable_fields = ('watching', 'likes', 'id', 'title')


class FeatureRequestsListSerializer(ListSerializer):
    def update(self, instance, validated_data):
        pass


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

