const Dashboard = ({ probeList }) => {
  return (
    <div>
      Dashboard
      <ul>
        {probeList.map((probe) => (
          <li>{probe.serial}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
