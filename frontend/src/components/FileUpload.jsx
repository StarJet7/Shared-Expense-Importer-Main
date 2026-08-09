import { useState } from "react";
import axios from "axios";
import DashboardCharts from "./DashboardCharts";

function FileUpload() {

    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const uploadFile = async () => {

        if (!file) {
            alert("Please select an Excel file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const response = await axios.post(
                ""https://shared-expense-importer.onrender.com/api/import/"",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            setResult(response.data);

            alert("Import Successful");

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        }

    };

    return (

        <div>

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button
                onClick={uploadFile}
                style={{
                    padding: "12px 25px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    background: "#3b82f6",
                    color: "white",
                    fontSize: "16px"
                }}
            >
                Upload Excel
            </button>

            {result && (

                <div
                    style={{
                        marginTop: "40px",
                        width: "700px",
                        background: "#1f2937",
                        padding: "30px",
                        borderRadius: "18px",
                        boxShadow: "0 0 25px rgba(0,0,0,.4)",
                        color: "white",
                        textAlign: "left"
                    }}
                >

                    <h2
                        style={{
                            color: "#22c55e",
                            marginBottom: "20px"
                        }}
                    >
                        ✅ {result.message}
                    </h2>

                    <div
    style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginTop: "30px",
        marginBottom: "30px"
    }}
>

    <div className="statCard">
        <h3>{result.imported_rows}</h3>
        <p>Imported</p>
    </div>

    <div className="statCard">
        <h3>{result.total_rows}</h3>
        <p>Total Rows</p>
    </div>

    <div className="statCard">
        <h3>{result.issues}</h3>
        <p>Issues</p>
    </div>

    <div className="statCard">
        <h3>
            {Math.round((result.imported_rows / result.total_rows) * 100)}%
        </h3>
        <p>Success</p>
    </div>

</div>
<div style={{ marginBottom: "30px" }}>

    <p
        style={{
            marginBottom: "10px",
            color: "#9ca3af"
        }}
    >
        Import Progress
    </p>

    <div
        style={{
            width: "100%",
            height: "14px",
            background: "#111827",
            borderRadius: "20px",
            overflow: "hidden"
        }}
    >

        <div
            style={{
                width: `${Math.round((result.imported_rows/result.total_rows)*100)}%`,
                height: "100%",
                background: "linear-gradient(90deg,#22c55e,#3b82f6)",
                transition: "1s"
            }}
        />

    </div>

    <p
        style={{
            marginTop: "10px",
            color: "#22c55e",
            fontWeight: "bold"
        }}
    >
        {Math.round((result.imported_rows/result.total_rows)*100)}% Imported Successfully
    </p>

</div>
                    <hr
                        style={{
                            margin: "20px 0",
                            border: "1px solid #374151"
                        }}
                    />

                    <h3 style={{ marginBottom: "20px" }}>
                        ⚠ Detected Issues
                    </h3>

                    {result.report.length === 0 ? (

                        <p
                            style={{
                                color: "#22c55e",
                                fontSize: "18px"
                            }}
                        >
                             No anomalies found
                        </p>

                    ) : (

                        result.report.map((item, index) => (

                            <div
                                key={index}
                                style={{
                                    background: "#111827",
                                    padding: "15px",
                                    marginBottom: "15px",
                                    borderRadius: "12px",
                                    borderLeft: "5px solid #ef4444"
                                }}
                            >

                                <h4>Row {item.row}</h4>

                                <p>{item.issue}</p>

                            </div>

                        ))

                    )}
                    <DashboardCharts result={result} />

                </div>

            )}

        </div>

    );

}

export default FileUpload;