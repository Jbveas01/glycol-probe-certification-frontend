const ProbeForm = ({ newSerial, onChange, onSubmit, placeHolder }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={newSerial} onChange={onChange} placeholder={placeHolder}/>
        <button type="submit">Submit data</button>
      </form>
    </div>
  );
};

export default ProbeForm;
