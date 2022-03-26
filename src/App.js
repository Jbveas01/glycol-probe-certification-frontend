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
import Shipping from "./views/Shipping";
import Warehouse from "./views/Warehouse";

function App() {
  const TOTALPROBES = 300;

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
  const [certProbeCount, setCertProbeCount] = useState("");
  const [mobileNav, setMobileNav] = useState(true);
  const [tdID, setTdID] = useState("");
  const [updateClass, setUpdateClass] = useState("hidden");

  useEffect(() => {
    axios.get("http://localhost:3001/api/probes").then((res) => {
      setProbeList(res.data);
      setCertProbeCount(res.data.length);
    });
  }, [useTrigger]);

  ///Handle Form changes
  const handleSerialChange = (event) => setSerial(event.target.value);
  const handleCertChange = (event) => setCert(event.target.value);
  const handleLotChange = (event) => setLot(event.target.value);
  const handleManufChange = (event) => setManuf(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDeleteChange = (event) => setDeleteProbe(event.target.value);
  const handleNavClick = () => setMobileNav(!mobileNav);

  const tdClick = (event) => {
    event.preventDefault();
    setTdID(event.target.innerHTML);
    setUpdateClass("update-form");
  };

  const closeForm = (event) => {
    event.preventDefault();
    setUpdateClass("hidden");
  };

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
        setSerial("");
        setCert("");
        setLot("");
        setManuf("");
        setFormError(`Probe ${probe._id.toUpperCase()} added to the database!`);
        setSuccess("submit-success");
        setTrigger(!useTrigger);
      })
      .catch((error) => {
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
          setTrigger(!useTrigger);
          setDeleteProbe("");
          setFormError(`Probe ${deleteProbe} deleted successfully!`);
          setSuccess("submit-success");
        })
        .catch((error) => {
          setSuccess("submit-error");
          setFormError(error.response.data);
        });
    }
  };

  const editCertifcation = async (event) => {
    event.preventDefault();
    const id = tdID;
    const updatedExpiration = new Date(
      new Date(newCert).setFullYear(new Date(newCert).getFullYear() + 2)
    );
    await axios
      .put(`http://localhost:3001/api/probes/${id}`, {
        certificationDate: newCert,
        expirationDate: updatedExpiration,
      })
      .then((res) => {
        setSuccess("submit-success");
        setFormError(
          `Probe ${id}'s Certifcation date updated to ${new Date(
            newCert
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
          })}`
        );
      });
    setTrigger(!useTrigger);
    setUpdateClass("hidden");
  };

  return (
    <div className="App">
      <Header />
      <Navbar mobileNav={mobileNav} handleNavClick={handleNavClick} />
      <div className="main">
        <Routes>
          <Route
            path="/probes"
            element={
              <>
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
                <Probes
                  probeList={probeList}
                  filter={filter}
                  handleChange={handleFilterChange}
                  tdClick={tdClick}
                  handleCertChange={handleCertChange}
                  editCertifcation={editCertifcation}
                  newCert={newCert}
                  updateClass={updateClass}
                  tdID={tdID}
                  closeForm={closeForm}
                />
                <form onSubmit={submitDelete}>
                  <input
                    value={deleteProbe}
                    onChange={handleDeleteChange}
                    placeholder="Enter Probe Serial#"
                  ></input>
                  <button type="submit" className="delete-btn">
                    Delete probe
                  </button>
                </form>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Dashboard
                probeList={probeList}
                certProbeCount={certProbeCount}
                totalProbes={TOTALPROBES}
                tdClick={tdClick}
                handleCertChange={handleCertChange}
                editCertifcation={editCertifcation}
                newCert={newCert}
                updateClass={updateClass}
                tdID={tdID}
                closeForm={closeForm}
              />
            }
          />
          {/* <Route path="/shipping" element={<Shipping />} /> */}
          {/* <Route path="/warehouse" element={<Warehouse />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
