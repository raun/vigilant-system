from rest_framework.serializers import ModelSerializer

from thanos.models import FeatureRequest, Comment, UserActionsFR, FeatureRequestResponse


class FeatureRequestSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'


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

