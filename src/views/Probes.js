import "./Probes.css";
import ProbeTable from "../components/ProbeTable";
const Probes = ({ probeList, filter, handleChange }) => {
  return (
    <div>
      <input
        value={filter}
        placeholder="Search Serial #'s"
        onChange={handleChange}
      />
      <ProbeTable
        probeList={probeList}
        filterFunction={(probe) => probe._id.includes(filter.toUpperCase())}
      />
    </div>
  );
};

export default Probes;
