from django.contrib import admin

from thanos.models import FeatureRequest, FeatureRequestResponse


class FeatureRequestResponseAdmin(admin.TabularInline):
    fields = ('display_status', 'eta', 'is_valid')
    readonly_fields = ('created_at', 'updated_at', 'is_active')
    model = FeatureRequestResponse


class FeatureRequestAdmin(admin.ModelAdmin):
    inlines = (FeatureRequestResponseAdmin, )
    fields = ('creator', 'tags', 'title', 'description')
    list_display = ('title', 'creator', 'tags', 'description')
    search_fields = ('title', 'description')
    list_filter = ('tags', 'is_active')


admin.site.register(FeatureRequest, FeatureRequestAdmin)
