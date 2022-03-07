import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <NavLink to='/probes'>Probes</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/shipping'>Shipping</NavLink>
            <NavLink to='/warehouse'>Warehouse</NavLink>
        </div >
    )
}

export default Navbar