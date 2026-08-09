from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GroupMembership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateField()
    left_at = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.group.name}"


class Expense(models.Model):
    SPLIT_CHOICES = [
         ("equal", "Equal"),
        ("exact", "Exact"),
        ("percentage", "Percentage"),
        ("share", "Share"),
        ("unequal", "Unequal"),
    ]

    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    paid_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="INR")
    split_type = models.CharField(max_length=20, choices=SPLIT_CHOICES)
    date = models.DateField()

    def __str__(self):
        return self.description


class ExpenseParticipant(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    share = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.expense.description}"


class Settlement(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    payer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="payments_made"
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="payments_received"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.payer.username} → {self.receiver.username}"