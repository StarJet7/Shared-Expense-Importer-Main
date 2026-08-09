# SCOPE

## Purpose

The objective of this application is to import shared expense data from Excel files while identifying invalid or inconsistent records.

---

# Supported Anomaly Detection

## Missing Payer

Action Taken:

- Record reported as an anomaly.
- Valid records continue processing.

---

## Invalid Percentage Split

Action Taken:

- Percentage totals are validated.
- Invalid totals are reported.

---

## Empty Required Fields

Action Taken:

- Missing mandatory values are reported.

---

## Invalid Data

Action Taken:

- Invalid rows are excluded from import.

---

# Database Schema

Group

- id
- name

GroupMembership

- group
- user
- joined_at

Expense

- group
- payer
- amount
- split_type
- created_at

ExpenseParticipant

- expense
- participant
- amount

Settlement

- payer
- receiver
- amount