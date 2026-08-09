from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .services.importer import ExpenseImporter
from rest_framework import viewsets
from .models import (
    Group,
    GroupMembership,
    Expense,
    ExpenseParticipant,
    Settlement,
)
from .serializers import (
    GroupSerializer,
    GroupMembershipSerializer,
    ExpenseSerializer,
    ExpenseParticipantSerializer,
    SettlementSerializer,
)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupMembershipViewSet(viewsets.ModelViewSet):
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class ExpenseParticipantViewSet(viewsets.ModelViewSet):
    queryset = ExpenseParticipant.objects.all()
    serializer_class = ExpenseParticipantSerializer


class SettlementViewSet(viewsets.ModelViewSet):
    queryset = Settlement.objects.all()
    serializer_class = SettlementSerializer

class ImportExpenseView(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        importer = ExpenseImporter(file)

        report = importer.process()

        return Response({

    "message":"Import completed",

    "total_rows": len(importer.df),

    "imported_rows": len(importer.df) - len(report),

    "issues": len(report),

    "report": report

})