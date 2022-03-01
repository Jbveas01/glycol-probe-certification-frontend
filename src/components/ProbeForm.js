import React from "react";

const ProbeForm = ({ newProbe, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={newProbe} onChange={onChange} />
        <button type="submit">Submit data</button>
      </form>
    </div>
  );
};

export default ProbeForm;
