import { useState } from "react";
import ProbeForm from "./components/ProbeForm";

function App() {
  const [newSerial, setSerial] = useState("");

  ///Handle serial number change
  const handleSerialChange = (event) => {
    setSerial(event.target.value);
  };
  ///Handles Submitting the probe into the database
  const submitProbe = (event) => {
    event.preventDefault();
    const data = new FormData(event.target)
    console.log(data.get('serial'))
    console.log(data.get('certDate'))
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
