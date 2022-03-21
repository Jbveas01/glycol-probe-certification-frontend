import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isActive, mobileNav, handleNavClick }) => {
  const navClasses = ['hide-nav', 'navbar']
  return (
    <div className={navClasses[Number(mobileNav)]}>
      <div className="nav-button-container">
        <button onClick={handleNavClick}>&#8592;</button>
      </div>
      <div className="navlink-container" onClick={handleNavClick}>

        <NavLink to="/" className={`nav-link ${isActive ? "active" : ""}`}>
          Dashboard
        </NavLink>
        <NavLink
          to="/probes"
          className={`nav-link ${isActive ? "active" : ""}`}
        >
          Probes
        </NavLink>
        <NavLink
          to="/shipping"
          className={`nav-link ${isActive ? "active" : ""}`}
        >
          Shipping
        </NavLink>
        <NavLink
          to="/warehouse"
          className={`nav-link ${isActive ? "active" : ""}`}
        >
          Warehouse
        </NavLink>
      </div>
    </div >
  );
};

export default Navbar;
