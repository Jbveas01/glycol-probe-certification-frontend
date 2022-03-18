import "./Header.css";
import vaccine from "../imgs/vaccine.png";

const Header = () => {
  return (
    <div className="header">
      <img className="vaccine" src={vaccine} alt="Vaccine"></img>
      <h1 className="header-title">Probe Certification Tool</h1>
    </div>
  );
};
export default Header;
