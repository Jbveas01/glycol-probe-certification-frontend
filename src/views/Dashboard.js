import Card from "../components/Card";
import "./Dashboard.css";
import Test from "../components/Test";
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
      <Test certProbeCount={certProbeCount} totalProbes={totalProbes} />
      <ProbeTable
        probeList={probeList}
        filterFunction={(probe) => new Date(probe.expirationDate) <= new Date()}
        tdClick={tdClick}
        handleCertChange={handleCertChange}
        editCertifcation={editCertifcation}
        newCert={newCert}
        updateClass={updateClass}
        tdID={tdID}
      />
    </div>
  );
};

export default Dashboard;
