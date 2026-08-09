from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImportExpenseView
path("import/", ImportExpenseView.as_view()),
from .views import (
    GroupViewSet,
    GroupMembershipViewSet,
    ExpenseViewSet,
    ExpenseParticipantViewSet,
    SettlementViewSet,
)

router = DefaultRouter()

router.register(r'groups', GroupViewSet)
router.register(r'memberships', GroupMembershipViewSet)
router.register(r'expenses', ExpenseViewSet)
router.register(r'participants', ExpenseParticipantViewSet)
router.register(r'settlements', SettlementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("import/", ImportExpenseView.as_view())
]