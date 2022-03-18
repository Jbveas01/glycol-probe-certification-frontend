import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isActive }) => {
  return (
    <div className="navbar">
      <div className="navlink-container">
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
    </div>
  );
};

export default Navbar;
