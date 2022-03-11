import { useState, useEffect } from "react";
import ProbeForm from "./components/ProbeForm";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Footer from "./components/Footer";

function App() {
  const [newSerial, setSerial] = useState("");
  const [newCert, setCert] = useState("");
  const [newLot, setLot] = useState("");
  const [newManuf, setManuf] = useState("");
  const [filter, setFilter] = useState("");
  const [useTrigger, setTrigger] = useState(false);
  const [probeList, setProbeList] = useState([]);
  const [deleteProbe, setDeleteProbe] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/probes").then((res) => {
      console.log("Probes Grabbed");
      setProbeList(res.data);
    });
  }, [useTrigger]);

  ///Handle Form changes
  const handleSerialChange = (event) => setSerial(event.target.value);
  const handleCertChange = (event) => setCert(event.target.value);
  const handleLotChange = (event) => setLot(event.target.value);
  const handleManufChange = (event) => setManuf(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDeleteChange = (event) => setDeleteProbe(event.target.value);

  ///Handles Submitting the probe into the database
  const submitProbe = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const probe = {
      _id: data.get("serial"),
      certificationDate: new Date(data.get("certDate")),
      lot: data.get("lot#"),
      manufactureDate: new Date(data.get("manufDate")),
      ///Add 2 years to certifcation date for expiration date
      expirationDate: new Date(
        new Date(data.get("certDate")).setFullYear(
          new Date(data.get("certDate")).getFullYear() + 2
        )
      ),
    };
    setSerial("");
    setCert("");
    setLot("");
    setManuf("");
    await axios.post("http://localhost:3001/api/probes", probe).then((res) => {
      console.log(res);
    });
    setTrigger(!useTrigger);
  };

  const submitDelete = async (event) => {
    event.preventDefault();
    await axios
      .delete(`http://localhost:3001/api/probes/${deleteProbe}`)
      .then((res) => {
        console.log(res.data);
      });
    setDeleteProbe("");
    setTrigger(!useTrigger);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Routes>
          <Route
            path="/probes"
            element={
              <ProbeForm
                newSerial={newSerial}
                newCert={newCert}
                newLot={newLot}
                newManuf={newManuf}
                handleLotChange={handleLotChange}
                handleCertChange={handleCertChange}
                handleSerialChange={handleSerialChange}
                handleManufChange={handleManufChange}
                onSubmit={submitProbe}
              />
            }
          ></Route>
        </Routes>
        <Dashboard
          probeList={probeList}
          filter={filter}
          handleChange={handleFilterChange}
        />
        <form onSubmit={submitDelete}>
          <input value={deleteProbe} onChange={handleDeleteChange}></input>
          <button type="submit">Delete probe</button>
        </form>
      </div>
      <Footer />
    </div>

  );
}

export default App;
