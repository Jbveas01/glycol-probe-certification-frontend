const ProbeForm = ({ newSerial, onChange, onSubmit, placeHolder }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='serial' value={newSerial} onChange={onChange} placeholder={placeHolder} />
        <input name='certDate' placeholder='Enter certification date' />
        <input name='lot#' placeholder='Enter Lot #' />
        <input name='manufDate' placeholder='Enter manufactured date' />
        <button type="submit">Submit data</button>
      </form>
    </div>
  );
};

export default ProbeForm;
