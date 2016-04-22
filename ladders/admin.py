from django.contrib import admin

# Register your models here.

from .models import Ladder, User_Ladder

class ChoiceInline(admin.StackedInline):
    model = User_Ladder
    extra = 3

class LadderAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,          {'fields': ['name', 'manager']}),
    ]
    inlines = [ChoiceInline]



admin.site.register(Ladder, LadderAdmin)
