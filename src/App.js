import { useState } from "react";
import ProbeForm from "./components/ProbeForm";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';

function App() {
  const [newSerial, setSerial] = useState("");
  const [newCert, setCert] = useState("");
  const [newLot, setLot] = useState("");
  const [newManuf, setManuf] = useState("");
  const [filter, setFilter] = useState("");
  const [probeList, setProbeList] = useState([
    {
      _id: "GP00001",
      certificationDate: "03/04/2022",
      lotNum: "LXW21",
      manufactureDate: "02/02/2022",
      expirationDate: "03/04/2024",
    },
  ]);

  ///Handle Form changes
  const handleSerialChange = (event) => setSerial(event.target.value);
  const handleCertChange = (event) => setCert(event.target.value);
  const handleLotChange = (event) => setLot(event.target.value);
  const handleManufChange = (event) => setManuf(event.target.value);

  ///Handles Submitting the probe into the database
  const submitProbe = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // const probe = {
    //   serial: data.get("serial"),
    //   certificationDate: new Date(data.get("certDate")),
    //   lotNum: data.get("lot#"),
    //   manufactureDate: new Date(data.get("manufDate")),
    //   ///Add 2 years to certifcation date for expiration date
    //   expirationDate: new Date(
    //     new Date(data.get("certDate")).setFullYear(
    //       new Date(data.get("certDate")).getFullYear() + 2
    //     )
    //   ),
    // };
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
    const probes = probeList.concat(probe);
    setProbeList(probes);
    setSerial("");
    setCert("");
    setLot("");
    setManuf("");
    axios.post("http://localhost:3001/api/probes", probe).then((res) => {
      console.log(res);
    });
  };

  const filterProbes = () => {
    const filteredProbes = probeList.filter(probe => probe._id.includes(filter))
    console.log(filteredProbes)
  }
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/probes' element={<ProbeForm
          newSerial={newSerial}
          newCert={newCert}
          newLot={newLot}
          newManuf={newManuf}
          handleLotChange={handleLotChange}
          handleCertChange={handleCertChange}
          handleSerialChange={handleSerialChange}
          handleManufChange={handleManufChange}
          onSubmit={submitProbe}
        />}>
        </Route>
      </Routes>
      <Dashboard probeList={probeList} filter={filter} handleChange={changeFilter} />
    </div >
  );
}

export default App;
