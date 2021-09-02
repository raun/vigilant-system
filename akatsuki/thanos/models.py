from django.contrib.auth.models import User
from django.db import models

from core.models import TimeStampedModel
from thanos.constants import FEATURE_REQUEST_TAGS, FR_USER_ACTION_TYPE


class FeatureRequest(TimeStampedModel):
    objects = models.Manager()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.CharField(max_length=40, choices=FEATURE_REQUEST_TAGS)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


class FeatureRequestResponse(TimeStampedModel):
    objects = models.Manager()
    feature_request = models.OneToOneField(FeatureRequest, on_delete=models.CASCADE)
    display_status = models.CharField(max_length=5000)
    eta = models.DateTimeField()
    is_valid = models.BooleanField(default=False)


class UserActionsFR(TimeStampedModel):
    objects = models.Manager()
    user = models.ForeignKey(User, related_name="user_actions_FR", on_delete=models.CASCADE)
    feature_request = models.ForeignKey(FeatureRequest, related_name="user_actions", on_delete=models.CASCADE)
    action_type = models.PositiveIntegerField(choices=FR_USER_ACTION_TYPE)


class Comment(TimeStampedModel):
    objects = models.Manager()
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    feature_request = models.ForeignKey(FeatureRequest, related_name="comments", on_delete=models.CASCADE)
    text = models.TextField()


class UserActionComment(TimeStampedModel):
    objects = models.Manager()
    user = models.ForeignKey(User, related_name="user_actions_comment", on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name="user_actions", on_delete=models.CASCADE)



# class Reply(TimeStampedModel):
#     objects = models.Manager()
#     user = models.ForeignKey(User, related_name="replies", on_delete=models.CASCADE)
#     feature_request = models.ForeignKey(FeatureRequest, related_name="replies", on_delete=models.CASCADE)
#     parent_comment_id = models.ForeignKey(Comment, related_name="replies", on_delete=models.CASCADE)
#     text = models.TextField()
