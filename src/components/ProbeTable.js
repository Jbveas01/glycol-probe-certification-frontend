import "./ProbeTable.css";

const ProbeTable = ({
  probeList,
  filterFunction,
  tdClick,
  handleCertChange,
  editCertifcation,
  newCert,
  updateClass,
  tdID,
}) => {
  const filteredProbes = probeList.filter(filterFunction);
  // sort((a, b) => new Date(a.expirationDate) > new Date(b.expirationDate))
  // const editClass = ["hidden", "update-form"];
  const editClass = ["hidden", "update-form"];
  ///Need to open edit bar at top and fill in data from the probe
  return (
    <>
      <div className={editClass[Number(updateClass)]}>
        <form onSubmit={editCertifcation}>
          <div>
            {/* Edit Probe {filteredProbes.find((probe) => probe._id === tdID)._id} */}
          </div>
          <input
            onChange={handleCertChange}
            value={newCert}
            type="date"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="table-div">
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
                  <td onClick={tdClick} className="table-serial">
                    {_id}
                  </td>
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
    </>
  );
};

export default ProbeTable;
