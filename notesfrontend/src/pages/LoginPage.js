import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";


const LoginPage = () => {
    let {user} = useContext(AuthContext)
    let {loginUser} = useContext(AuthContext)

    return(
        <>
            <div className="login-container">
                <form onSubmit={loginUser}>
                    <input type="text" name="username" placeholder="Enter Username" className="login-input"/>
                    <input type="password" name="password" placeholder="Enter Password" className="login-input" />
                    <input className='login-button' type="submit" />
                </form>
            </div>
            <div className="register-text">
                <p> Don't have a account yet <Link to="/register"> Register here</Link></p>
            </div>
            
        </>
    )
}

export default LoginPage;
