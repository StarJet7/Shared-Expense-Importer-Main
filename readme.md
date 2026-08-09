# Shared Expense Importer

## Overview

Shared Expense Importer is a full-stack web application built using Django REST Framework and React.

The application allows users to upload an Excel spreadsheet containing shared expenses. It validates each record, detects anomalies, imports valid records, and generates a detailed import report with analytics.

---

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- Pandas
- SQLite

### Frontend

- React
- Axios
- Recharts

---

## Features

- Upload Excel files
- Import expense data
- Detect data anomalies
- Generate import reports
- Dashboard with statistics
- Progress visualization
- Pie Chart and Bar Chart analytics

---

## Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## AI Used

OpenAI ChatGPT was used as an engineering assistant for:

- Debugging
- React UI development
- Django REST setup
- API integration
- Code review

All AI-generated code was reviewed, tested, and modified before final integration.