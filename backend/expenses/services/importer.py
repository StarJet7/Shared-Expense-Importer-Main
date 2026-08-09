import pandas as pd


class ExpenseImporter:

    def __init__(self, file):
        self.df = pd.read_excel(file)
        self.report = []

    def normalize_names(self):

        mapping = {
            "priya": "Priya",
            "Priya S": "Priya",
            "rohan ": "Rohan",
        }

        self.df["paid_by"] = self.df["paid_by"].replace(mapping)

    def detect_missing_payer(self):

        missing = self.df[self.df["paid_by"].isna()]

        for index in missing.index:

            self.report.append({
                "row": index + 2,
                "issue": "Missing payer"
            })

    def round_amounts(self):

        self.df["amount"] = self.df["amount"].round(2)

    def detect_invalid_percentages(self):

        percentage_rows = self.df[
            self.df["split_type"] == "percentage"
        ]

        for index, row in percentage_rows.iterrows():

            details = row["split_details"]

            total = 0

            if pd.notna(details):

                for part in details.split(";"):

                    total += float(
                        part.split()[-1].replace("%", "")
                    )

            if total != 100:

                self.report.append({
                    "row": index + 2,
                    "issue": f"Percentage totals {total}%"
                })

    def process(self):

        self.normalize_names()

        self.detect_missing_payer()

        self.round_amounts()

        self.detect_invalid_percentages()

        return self.report