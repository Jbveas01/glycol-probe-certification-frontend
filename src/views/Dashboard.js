import Card from "../components/Card";
import "./Dashboard.css"
import Test from "../components/Test"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Certification Dashboard</h1>
      <div className="card-container">
        <Card className='dashboard-card' title='Certified Probes' stats='1200' />
        <Card className='dashboard-card' title='Uncertified Probes' stats='1200' />
        <Card className='dashboard-card' title='Probes on Hand' stats='1200' />
      </div>
      <Test />
    </div>);
};

export default Dashboard;
