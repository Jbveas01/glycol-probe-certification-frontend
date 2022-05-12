import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ProbeForm from "./components/ProbeForm";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Navbar";
import Probes from "./views/Probes";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const TOTALPROBES = 300;
  const BASEURL = "/api/probes";

  const [newSerial, setNewSerial] = useState("");
  const [newCert, setNewCert] = useState("");
  const [newLot, setNewLot] = useState("");
  const [newManuf, setNewManuf] = useState("");
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [probeList, setProbeList] = useState([]);
  const [deleteProbe, setDeleteProbe] = useState("");
  const [success, setSuccess] = useState("hidden");
  const [formError, setFormError] = useState("");
  const [certProbeCount, setCertProbeCount] = useState("");
  const [mobileNav, setMobileNav] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [updateClass, setUpdateClass] = useState("hidden");
  const [updateCert, setUpdateCert] = useState("");

  //Fetch probe list on load and when refresh is called
  useEffect(() => {
    axios.get(BASEURL).then((res) => {
      setProbeList(res.data);
      setCertProbeCount(res.data.length);
    });
  }, [refresh]);

  //Handle Form changes
  const handleSerialChange = (event) => setNewSerial(event.target.value);
  const handleCertChange = (event) => setNewCert(event.target.value);
  const handleLotChange = (event) => setNewLot(event.target.value);
  const handleManufChange = (event) => setNewManuf(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDeleteChange = (event) => setDeleteProbe(event.target.value);
  const handleUpdateCert = (event) => setUpdateCert(event.target.value);

  const handleNavClick = () => setMobileNav(!mobileNav);

  //Handles selecting a probe on the probe table
  const selectId = (event) => {
    event.preventDefault();
    setSelectedId(event.target.innerHTML);
    setUpdateClass("update-form");
  };

  //Closes update form
  const closeForm = (event) => {
    event.preventDefault();
    setUpdateClass("hidden");
  };

  //Retrieves data from probe input form, creates new probe, and submits the probe into the database
  const submitProbe = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const probe = {
      _id: data.get("serial"),
      certificationDate: new Date(data.get("certDate")),
      lot: data.get("lot#"),
      manufactureDate: new Date(data.get("manufDate")),
      //Add 2 years to certifcation date for expiration date
      expirationDate: new Date(
        new Date(data.get("certDate")).setFullYear(
          new Date(data.get("certDate")).getFullYear() + 2
        )
      ),
    };
    await axios
      .post(BASEURL, probe)
      .then((res) => {
        setNewSerial("");
        setNewCert("");
        setNewLot("");
        setNewManuf("");
        setFormError(`Probe ${probe._id.toUpperCase()} added to the database!`);
        setSuccess("submit-success");
        setRefresh(!refresh);
      })
      .catch((error) => {
        setSuccess("submit-error");
        setFormError(error.response.data);
      });
  };

  //Handles deleting probes from database based on probe ID
  const submitDelete = async (event) => {
    event.preventDefault();
    if (!deleteProbe) {
      setSuccess("submit-error");
      setFormError("No data entered");
    } else {
      await axios
        .delete(`${BASEURL}/${deleteProbe}`)
        .then((res) => {
          setRefresh(!refresh);
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

  //Updates the database with the new probe certification date.
  const editCertifcation = async (event) => {
    event.preventDefault();
    const id = selectedId;
    const updatedExpiration = new Date(
      new Date(updateCert).setFullYear(new Date(updateCert).getFullYear() + 2)
    );
    await axios
      .put(`${BASEURL}/${id}`, {
        certificationDate: updateCert,
        expirationDate: updatedExpiration,
      })
      .then((res) => {
        setSuccess("submit-success");
        setFormError(
          `Probe ${id}'s Certifcation date updated to ${new Date(
            updateCert
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
          })}`
        );
      });
    setRefresh(!refresh);
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
                  selectId={selectId}
                  handleCertChange={handleCertChange}
                  handleUpdateCert={handleUpdateCert}
                  updateCert={updateCert}
                  updateClass={updateClass}
                  selectedId={selectedId}
                  closeForm={closeForm}
                  editCertifcation={editCertifcation}
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
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
