const Dashboard = ({ probeList, filter, handleChange }) => {
  const filteredProbes = probeList.filter((probe) => probe._id.includes(filter))
  return (
    <div>
      Dashboard
      <input value={filter} onChange={handleChange} />
      <ul>
        {filteredProbes.map(probe => <li>{probe._id}</li>)}
      </ul>
    </div>
  );
};

export default Dashboard;
