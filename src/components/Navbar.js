import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isActive, mobileNav, handleNavClick }) => {
  const navClasses = ['navbar', 'hide-nav']
  return (
    <div className={navClasses[Number(mobileNav)]}>
      <div className="nav-button-container">
        <button className='nav-button' onClick={handleNavClick}>
          <i class="fa fa-bars" aria-hidden="true"></i></button>
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
