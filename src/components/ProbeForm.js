const ProbeForm = ({ newCert, newSerial, newLot, newManuf, handleManufChange, handleSerialChange, onSubmit, handleCertChange, handleLotChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='serial' value={newSerial} onChange={handleSerialChange} placeholder='Enter Probe Serial #' />
        <input name='certDate' value={newCert} onChange={handleCertChange} placeholder='Enter certification date' />
        <input name='lot#' value={newLot} onChange={handleLotChange} placeholder='Enter Lot #' />
        <input name='manufDate' value={newManuf} onChange={handleManufChange} placeholder='Enter manufactured date' />
        <button type="submit">Submit data</button>
      </form>
    </div>
  );
};

export default ProbeForm;
