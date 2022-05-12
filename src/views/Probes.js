import "./Probes.css";
import ProbeTable from "../components/ProbeTable";
const Probes = ({
  probeList,
  filter,
  handleChange,
  selectId,
  handleCertChange,
  handleUpdateCert,
  updateCert,
  updateClass,
  selectedId,
  closeForm,
  editCertifcation,
}) => {
  return (
    <div className="probes">
      <input
        value={filter}
        placeholder="Search Serial #'s"
        onChange={handleChange}
        className="search-input"
      />
      <ProbeTable
        probeList={probeList}
        filterFunction={(probe) => probe._id.includes(filter.toUpperCase())}
        selectId={selectId}
        handleCertChange={handleCertChange}
        handleUpdateCert={handleUpdateCert}
        updateCert={updateCert}
        updateClass={updateClass}
        selectedId={selectedId}
        closeForm={closeForm}
        tableClass={"table-serial"}
        editCertifcation={editCertifcation}
      />
    </div>
  );
};

export default Probes;
