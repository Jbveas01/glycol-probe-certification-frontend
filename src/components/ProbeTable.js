import "./ProbeTable.css";

const ProbeTable = ({
  probeList,
  filterFunction,
  tdClick,
  handleUpdateCert,
  editCertifcation,
  updateCert,
  updateClass,
  tdID,
  closeForm,
  tableClass,
}) => {
  const filteredProbes = probeList.filter(filterFunction);
  const sortedProbes = filteredProbes.sort(
    (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
  );
  return (
    <div className="probe-table">
      <div className={updateClass}>
        <form onSubmit={editCertifcation}>
          <div className="update-div">
            Update Certifcation Date for <b>{tdID}</b>
          </div>
          <input
            onChange={handleUpdateCert}
            value={updateCert}
            type="date"
            required
          />
          <button id="update-btn" type="submit">
            Update
          </button>
          <button id="cancel-btn" onClick={closeForm}>
            Cancel
          </button>
        </form>
      </div>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Lot #</th>
              <th>Manufacture Date</th>
              <th>Certification Date</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          {sortedProbes.map((probe) => {
            const {
              _id,
              lot,
              manufactureDate,
              certificationDate,
              expirationDate,
            } = probe;
            return (
              <tbody key={_id}>
                <tr>
                  <td onClick={tdClick} className={tableClass}>
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
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ProbeTable;
