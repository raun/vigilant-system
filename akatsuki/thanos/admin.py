from django.contrib import admin

from thanos.models import FeatureRequest, FeatureRequestResponse, Comment, UserActionsFR


class FeatureRequestResponseAdmin(admin.TabularInline):
    fields = ('display_status', 'eta', 'is_valid')
    readonly_fields = ('created_at', 'updated_at', 'is_active')
    model = FeatureRequestResponse


class CommentsAdmin(admin.TabularInline):
    fields = ('text', 'user')
    readonly_fields = ('created_at', 'updated_at', 'is_active')
    model = Comment


class FeatureRequestAdmin(admin.ModelAdmin):
    inlines = (FeatureRequestResponseAdmin, CommentsAdmin)
    fields = ('creator', 'tags', 'title', 'description')
    list_display = ('title', 'creator', 'tags', 'description')
    search_fields = ('title', 'description')
    list_filter = ('tags', 'is_active')


admin.site.register(FeatureRequest, FeatureRequestAdmin)
