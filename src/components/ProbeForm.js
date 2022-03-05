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
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="serial"
          value={newSerial}
          onChange={handleSerialChange}
          required
          placeholder="Enter Probe Serial #"
        />
        <input
          name="certDate"
          type="date"
          value={newCert}
          onChange={handleCertChange}
          required
          placeholder="Enter certification date"
        />
        <input
          name="lot#"
          value={newLot}
          onChange={handleLotChange}
          required
          placeholder="Enter Lot #"
        />
        <input
          name="manufDate"
          type="date"
          value={newManuf}
          onChange={handleManufChange}
          required
          placeholder="Enter manufactured date"
        />
        <button type="submit">Submit Probe</button>
      </form>
    </div>
  );
};

export default ProbeForm;
