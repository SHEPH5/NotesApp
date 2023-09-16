import { Link } from "react-router-dom";

const LoginButton = () =>{
    return(
        <div className="notes-title">
            <Link to="/login"> 
                <button>Login</button>
            </Link>
        </div>
    )
}


export default LoginButton;