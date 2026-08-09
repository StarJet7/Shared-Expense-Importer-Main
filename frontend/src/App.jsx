import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="app">

      <div className="hero">

        <h1> Shared Expense Importer</h1>

        <p>
          Import Excel sheets, detect anomalies,
          calculate balances and generate reports.
        </p>

      </div>

      <div className="upload-card">

        <FileUpload />

      </div>

      <div className="features">

        <div className="feature">
           Excel Import
        </div>

        <div className="feature">
           Anomaly Detection
        </div>

        <div className="feature">
           Balance Calculation
        </div>

        <div className="feature">
           Import Report
        </div>

      </div>

    </div>
  );
}

export default App;