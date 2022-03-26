import Card from "../components/Card";
import "./Dashboard.css";
import Charts from "../components/Charts";
import ProbeTable from "../components/ProbeTable";

const Dashboard = ({
  certProbeCount,
  totalProbes,
  probeList,
  tdClick,
  handleCertChange,
  editCertifcation,
  newCert,
  updateClass,
  tdID,
  closeForm,
}) => {
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
      <Charts
        certProbeCount={certProbeCount}
        totalProbes={totalProbes}
        probeList={probeList}
        filterFunction={(probe) => new Date(probe.expirationDate) <= new Date()}
      />
      <h1 className="expired-h1">Expired Probes</h1>
      <ProbeTable
        probeList={probeList}
        filterFunction={(probe) => new Date(probe.expirationDate) <= new Date()}
        updateClass={"hidden"}
      />
    </div>
  );
};

export default Dashboard;
