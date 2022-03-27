import "./ProbeForm.css";

const ProbeForm = ({
  newCert,
  newSerial,
  newLot,
  newManuf,
  handleManufChange,
  handleSerialChange,
  onSubmit,
  handleCertChange,
  handleLotChange,
  success,
  formError,
}) => {
  return (
    <div className="form-container">
      <legend className="legend-form">Enter Glycol Probe data</legend>
      <form className="probe-form" onSubmit={onSubmit} id="data-form">
        <label className="probe-label">
          Serial #<br />
          <input
            className="input-form"
            name="serial"
            value={newSerial}
            onChange={handleSerialChange}
            required
            placeholder="Enter Probe Serial #"
          />
        </label>
        <label className="probe-label">
          Certification Date
          <br />
          <input
            className="input-form"
            name="certDate"
            type="date"
            min="2000-01-01"
            max="3000-01-01"
            value={newCert}
            onChange={handleCertChange}
            required
            placeholder="Enter certification date"
          />
        </label>
        <label className="probe-label">
          Lot #<br />
          <input
            className="input-form"
            name="lot#"
            value={newLot}
            onChange={handleLotChange}
            maxLength="5"
            required
            placeholder="Enter Lot #"
          />
        </label>
        <label className="probe-label">
          Manufacture Date
          <br />
          <input
            className="input-form"
            name="manufDate"
            type="date"
            min="2000-01-01"
            max="3000-01-01"
            value={newManuf}
            onChange={handleManufChange}
            required
            placeholder="Enter manufactured date"
          />
        </label>
      </form>
      <div className="button-container">
        <div className={success}>{formError}</div>
        <button className="button-form" form="data-form" type="submit">
          Submit Probe
        </button>
      </div>
    </div>
  );
};

export default ProbeForm;
