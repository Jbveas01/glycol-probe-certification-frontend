import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Pie,
  Cell,
  PieChart,
} from "recharts";
import "./Charts.css";

const Charts = ({ certProbeCount, totalProbes, probeList, filterFunction }) => {
  const filteredProbes = probeList.filter(filterFunction);
  const expiredProbeCount = filteredProbes.length;

  const certData = [
    {
      name: "Probes",
      Certified: certProbeCount,
      "Total Probes": totalProbes - certProbeCount,
    },
  ];
  const expiredData = [
    {
      name: "Expired",
      value: expiredProbeCount,
    },
    {
      name: "Certified",
      value: certProbeCount,
    },
  ];
  const COLORS = ["#989594", "#0067b9"];
  return (
    <div className="chart-container">
      <div className="bar-container">
        <h3 className="bar-title">Certified Probes Vs Total Probes</h3>
        <BarChart
          width={200}
          height={300}
          data={certData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Certified" stackId="a" fill="#0067b9" />
          <Bar dataKey="Total Probes" stackId="a" fill="#989594" />
        </BarChart>
      </div>
      <div className="bar-container">
        <h3 className="bar-title">Certified Probes Vs Expired Probes</h3>
        <PieChart width={200} height={300}>
          <Pie data={expiredData} dataKey="value" label>
            {expiredData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Charts;
