const Dashboard = ({ probeList, filter, handleChange }) => {
  const filteredProbes = probeList.filter((probe) => probe._id.includes(filter))
  return (
    <div>
      Dashboard
      <input value={filter} onChange={handleChange} />
      <ul>
        {filteredProbes.map(probe => <li>{probe._id}</li>)}
      </ul>
      <table>
        <tr>
          {Object.keys(filteredProbes[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        <tr>
          {filteredProbes.map((probe) => (
            <tr>
              {Object.values(probe).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Dashboard;
