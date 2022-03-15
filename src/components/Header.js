import "./Header.css";
import vaccine from "../imgs/vaccine.png";

const Header = () => {
  return (
    <div className="header">
      <img className="vaccine" src={vaccine} alt="Vaccine"></img>
    </div>
  );
};
export default Header;
