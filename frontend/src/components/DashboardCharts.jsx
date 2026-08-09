import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function DashboardCharts({ result }) {
  if (!result) return null;

  const pieData = [
    {
      name: "Imported",
      value: result.imported_rows,
    },
    {
      name: "Issues",
      value: result.issues,
    },
  ];

  const barData = [
    {
      name: "Rows",
      Imported: result.imported_rows,
      Issues: result.issues,
      Total: result.total_rows,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        marginTop: "35px",
      }}
    >
      {/* Pie Chart */}

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Import Success
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Import Statistics
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Imported"
              fill="#22c55e"
            />

            <Bar
              dataKey="Issues"
              fill="#ef4444"
            />

            <Bar
              dataKey="Total"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;