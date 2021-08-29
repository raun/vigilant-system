from rest_framework.serializers import ModelSerializer

from thanos.models import FeatureRequest, Comment, Reply, UserActions


class FeatureRequestSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'


class FeatureRequestResponseSerializer(ModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'


class UserActionsSerializer(ModelSerializer):
    class Meta:
        model = UserActions
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ReplySerializer(ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'
