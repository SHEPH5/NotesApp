 import LoginButton from "./LoginButton";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

 const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return(
        <div className="app-header">
            <h1>Note List</h1>

            <span> | </span>
            { user ? (
                <Link><h3 onClick={logoutUser}> Logout</h3></Link>
            ):(
                <h2><Link to="/login">Login</Link></h2>
            )
            }
        </div>
    )
 }

 export default Header;