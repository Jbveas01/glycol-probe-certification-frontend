import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import "./Test.css";

const Test = ({ certProbeCount, totalProbes }) => {
  const data = [
    {
      name: "Probes",
      Certified: certProbeCount,
      Uncertified: totalProbes - certProbeCount,
    },
  ];
  return (
    <div>
      <div className="bar-container">
        <h3 className="bar-title">Certified to Uncertified Distribution</h3>
        <div style={{ width: 200, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
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
              <Bar dataKey="Uncertified" stackId="a" fill="#989594" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Test;
