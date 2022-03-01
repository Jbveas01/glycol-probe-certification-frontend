import { useState } from "react";
import ProbeForm from "./components/ProbeForm";
function App() {
  const [newProbe, setProbe] = useState("Enter probe data");
  const handleProbeChange = (event) => {
    setProbe(event.target.value);
  };
  const submitProbe = (event) => {
    event.preventDefault();
    console.log(newProbe);
    setProbe("");
  };

  return (
    <div className="App">
      <ProbeForm
        newProbe={newProbe}
        onChange={handleProbeChange}
        onSubmit={submitProbe}
      />
    </div>
  );
}

export default App;
