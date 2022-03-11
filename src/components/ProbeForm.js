import './ProbeForm.css'

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
    <div className='form-container'>
      <legend className='legend-form'>Enter Glycol Probe data</legend>
      <form className='probe-form' onSubmit={onSubmit} id='data-form'>
        <label className='probe-label'>Serial #<br />
          <input
            className='input-form'
            name="serial"
            value={newSerial}
            onChange={handleSerialChange}
            required
            placeholder="Enter Probe Serial #"
          />
        </label>
        <label className='probe-label'>Certification Date<br />
          <input
            className='input-form'
            name="certDate"
            type="date"
            value={newCert}
            onChange={handleCertChange}
            required
            placeholder="Enter certification date"
          />
        </label>
        <label className='probe-label'>Lot #<br />
          <input
            className='input-form'
            name="lot#"
            value={newLot}
            onChange={handleLotChange}
            required
            placeholder="Enter Lot #"
          />
        </label>
        <label className='probe-label'>Manufacture Date<br />
          <input
            className='input-form'
            name="manufDate"
            type="date"
            value={newManuf}
            onChange={handleManufChange}
            required
            placeholder="Enter manufactured date"
          />
        </label>
      </form>
      <button className='button-form' form="data-form" type="submit">Submit Probe</button>

    </div>
  );
};

export default ProbeForm;
