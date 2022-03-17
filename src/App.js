import { useState, useEffect } from "react";
import ProbeForm from "./components/ProbeForm";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import Probes from "./views/Probes";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Test from "./components/Test";
import Shipping from "./views/Shipping"
import Warehouse from "./views/Warehouse"

function App() {
  const [newSerial, setSerial] = useState("");
  const [newCert, setCert] = useState("");
  const [newLot, setLot] = useState("");
  const [newManuf, setManuf] = useState("");
  const [filter, setFilter] = useState("");
  const [useTrigger, setTrigger] = useState(false);
  const [probeList, setProbeList] = useState([]);
  const [deleteProbe, setDeleteProbe] = useState("");
  const [success, setSuccess] = useState("hidden");
  const [formError, setFormError] = useState("");

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
    await axios
      .post("http://localhost:3001/api/probes", probe)
      .then((res) => {
        console.log(res);
        setSerial("");
        setCert("");
        setLot("");
        setManuf("");
        setFormError(`Probe ${probe._id} added to the database!`);
        setSuccess("submit-success");
        setTrigger(!useTrigger);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        setSuccess("submit-error");
        setFormError(error.response.data);
      });
  };

  const submitDelete = async (event) => {
    event.preventDefault();
    if (!deleteProbe) {
      setSuccess("submit-error");
      setFormError("No data entered");
    } else {
      await axios
        .delete(`http://localhost:3001/api/probes/${deleteProbe}`)
        .then((res) => {
          console.log(res.data);
          setTrigger(!useTrigger);
          setDeleteProbe("");
          setFormError(`Probe ${deleteProbe} deleted successfully!`);
          setSuccess("submit-success");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          setSuccess("submit-error");
          setFormError(error.response.data);
        });
    }
  };

  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="main">
        <Routes>
          <Route
            path="/probes"
            element={<>
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
                success={success}
                formError={formError}
              />
              <Probes probeList={probeList}
                filter={filter}
                handleChange={handleFilterChange}
              />
            </>
            }>
          </Route>
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/warehouse' element={<Warehouse />} />
        </Routes>
        {/* <form onSubmit={submitDelete}>
          <input value={deleteProbe} onChange={handleDeleteChange}></input>
          <button type="submit">Delete probe</button>
        </form> */}
      </div>

      <Footer />
    </div >
  );
}

export default App;
