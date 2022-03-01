import { useState } from "react";
import ProbeForm from "./components/ProbeForm";

function App() {
  const [newSerial, setSerial] = useState("");

  ///Handle serial number change
  const handleSerialChange = (event) => {
    setSerial(event.target.value);
    console.log(event.target.name)
  };
  ///Handles Submitting the probe into the database
  const submitProbe = (event) => {
    event.preventDefault();
    console.log(newSerial);
    setSerial("");
  };

  return (
    <div className="App">
      <ProbeForm
        newSerial={newSerial}
        onChange={handleSerialChange}
        onSubmit={submitProbe}
        placeHolder='Enter Probe Serial#'
      />
    </div>
  );
}

export default App;
