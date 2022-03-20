import Card from "../components/Card";
import "./Dashboard.css";
import Test from "../components/Test";

const Dashboard = ({ certProbeCount, totalProbes }) => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Certification Dashboard</h1>
      <div className="card-container">
        <Card
          className="dashboard-card"
          title="Certified Probes"
          stats={certProbeCount}
        />
        <Card
          className="dashboard-card"
          title="Uncertified Probes"
          stats={totalProbes - certProbeCount}
        />
        <Card
          className="dashboard-card"
          title="Probes on Hand"
          stats={totalProbes}
        />
      </div>
      <Test certProbeCount={certProbeCount} totalProbes={totalProbes} />
    </div>
  );
};

export default Dashboard;
