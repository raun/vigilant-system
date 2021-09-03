from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from thanos import models, serializers


# Create your views here.

def success_response():
    return Response({"success": True})


def bad_request(message):
    response = {"success": False}
    if message is not None:
        response["message"] = message
    return Response(response, status=400)


def get_feature_request(watching_frs, fr, user_id):
    fr1 = fr
    fr_id = fr.get('id')
    if fr_id is not None and int(fr_id) in watching_frs:
        fr1['watching'] = True
    else:
        fr1['watching'] = False
    like_relations = set([rel['user'] for rel in models.UserActionsFR.objects.filter(action_type=1).
                         filter(feature_request__id=fr_id).values('user')])
    if user_id is not None and int(user_id) in like_relations:
        print('liked = True')
        fr1['liked'] = True
    else:
        fr1['liked'] = False
    fr1['likes'] = len(like_relations)
    return fr1


def get_response(watching_frs, all_frs, user_id):
    display_frs = []
    for fr in all_frs:
        # fr1 = fr
        # fr_id = fr.get('id')
        # if int(fr_id) in watching_frs:
        #     fr1['watching'] = True
        # else:
        #     fr1['watching'] = False
        # like_relations = set([rel['user'] for rel in models.UserActionsFR.objects.filter(action_type=1).
        #     filter(feature_request__id=fr_id).values('user')])
        # if int(user_id) in like_relations:
        #     print('liked = True')
        #     fr1['liked'] = True
        # else:
        #     fr1['liked'] = False
        # fr1['likes'] = len(like_relations)  # user filter must be removed
        display_frs.append(get_feature_request(watching_frs, fr, user_id))
    return Response(display_frs)


class SearchFR(APIView):

    def get(self, request):
        results = []
        if request.method == "GET":
            title = request.GET.get('title')
            description = request.GET.get('description')
            results = models.FeatureRequest.objects\
                .filter(Q(title__icontains=title) & Q(description__icontains=description)).values()
        return Response(results)


class FeatureRequestsListAll(APIView):

    def get(self, request):
        user_id = request.GET.get('user_id')
        feature_requests = models.FeatureRequest.objects.all().values()
        relations = models.UserActionsFR.objects.select_related('feature_requests').filter(user__id=user_id) \
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
        user_id = request.GET.get('user_id')
        owned = models.FeatureRequest.objects.filter(creator__id=user_id).values()
        relations = models.UserActionsFR.objects.select_related('feature_requests').filter(user__id=user_id) \
            .filter(action_type=3).values('feature_request')

        relations_set = set()
        for relation in relations:
            relations_set.add(relation.get('feature_request'))
        watched = models.FeatureRequest.objects.filter(id__in=relations_set)
        feature_requests = watched.union(owned).values()
        return get_response(relations_set, feature_requests, user_id)


class FeatureRequestCreate(generics.CreateAPIView):
    queryset = models.FeatureRequest.objects.all()
    serializer_class = serializers.FeatureRequestSerializer


class FeatureRequestDelete(APIView):
    def delete(self, request, feature_request_id):
        if feature_request_id is not None:
            fr = models.FeatureRequest.objects.filter(id=feature_request_id)
            if len(fr) == 0:
                return bad_request("Feature request with the given id does not exist")
        return success_response()


class FeatureRequestsDetail(APIView):
    def get(self, request, feature_request_id):
        user_id = request.GET.get('user_id')
        relations = models.UserActionsFR.objects.select_related('feature_requests').filter(user__id=user_id). \
            filter(action_type=3).values('feature_request')
        relations_set = set()
        for relation in relations:
            relations_set.add(relation.get('feature_request'))
        feature_requests = models.FeatureRequest.objects.all().filter(id=feature_request_id).values()
        feature_request = feature_requests[0]
        return Response(get_feature_request(relations_set, feature_request,
                                            user_id))


class FeatureRequestsResponseDetail(APIView):
    def get(self, request, feature_request_id):
        response = models.FeatureRequestResponse.objects.filter(feature_request__id=feature_request_id).values()
        if len(response) == 0:
            return Response({})
        else:
            return Response(response[0])


class CreateWatchView(APIView):
    def post(self, request):
        user = User.objects.get(id=request.data.get('user'))
        feature_request = models.FeatureRequest.objects.get(id=request.data.get('feature_request'))
        if user is not None and feature_request is not None:
            watch = models.UserActionsFR(user=user, feature_request=feature_request, action_type=3)
            watch.save()
            return success_response()
        return bad_request()


class UpvoteView(APIView):
    def post(self, request):
        user = User.objects.get(id=request.data.get('user'))
        feature_request = models.FeatureRequest.objects.get(id=request.data.get('feature_request'))
        if user is not None and feature_request is not None:
            watch = models.UserActionsFR(user=user, feature_request=feature_request, action_type=1)
            watch.save()
            return success_response()
        return bad_request()


class DeleteWatchView(APIView):
    def delete(self, request, feature_request_id, user_id):
        if feature_request_id is not None and user_id is not None:
            models.UserActionsFR.objects.filter(user__id=user_id). \
                filter(feature_request__id=feature_request_id).filter(action_type=3).delete()
            return success_response()
        return bad_request()


class DownVoteView(APIView):
    def delete(self, request, feature_request_id, user_id):
        if feature_request_id is not None and user_id is not None:
            models.UserActionsFR.objects.filter(user__id=user_id). \
                filter(feature_request__id=feature_request_id).filter(action_type=1).delete()
            return success_response()
        return bad_request()


class CommentsCreate(generics.CreateAPIView):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer


class CommentsDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'comment_id'
    serializer_class = serializers.CommentSerializer

    def get_queryset(self):
        comment_id = self.kwargs.get(self.lookup_url_kwarg)
        return models.Comment.objects.filter(id=comment_id)


def get_comment(comment, user_id):
    comment_id = comment.get('id')
    likes = models.UserActionComment.objects.select_related('comment').filter(comment__id=comment_id).values('user')
    liked = user_id is not None and int(user_id) in set([x['user'] for x in likes])
    return {"id": comment_id, "text": comment.get('text'), "likes": len(likes), "liked": liked}


def get_comments_for_fr(fr_id, user_id):
    comments = models.Comment.objects.select_related('feature_request').filter(feature_request__id=fr_id).values()
    all_comments = []
    for comment in comments:
        all_comments.append(get_comment(comment, user_id))
    return Response(all_comments)


class CommentsList(APIView):
    def get(self, request, feature_request_id):
        user_id = request.GET.get('user_id')
        return get_comments_for_fr(feature_request_id, user_id)


class LikeCommentView(generics.CreateAPIView):
    queryset = models.UserActionComment.objects.all()
    serializer_class = serializers.UserActionCommentSerializer


class UnlikeCommentView(APIView):

    def delete(self, request, user_id, comment_id):
        if user_id is not None and comment_id is not None:
            models.UserActionComment.objects.filter(user__id=user_id). \
                filter(comment__id=comment_id).delete()
        return Response({"success": True})
