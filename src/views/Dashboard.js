import "./Dashboard.css";
const Dashboard = ({ probeList, filter, handleChange }) => {
  const filteredProbes = probeList.filter(
    (probe) => probe._id.includes(filter)
    // Object.values(probe).some((v) => v.includes(filter))
  );
  return (
    <div className="table-div">
      {/* <input value={filter} onChange={handleChange} /> */}
      <table>
        <tbody>
          <th>Serial #</th>
          <th>Lot #</th>
          <th>Manufacture Date</th>
          <th>Certification Date</th>
          <th>Expiration Date</th>
          {filteredProbes.map((probe) => {
            const {
              _id,
              lot,
              manufactureDate,
              certificationDate,
              expirationDate,
            } = probe;
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{lot}</td>
                <td>
                  {new Date(manufactureDate).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>
                  {new Date(certificationDate).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>
                  {new Date(expirationDate).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
