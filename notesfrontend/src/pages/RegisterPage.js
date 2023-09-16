import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const RegisterPage = () =>{

    let {registerUser} = useContext(AuthContext)
    return(
        <>
            <div className="register-container">
                <form onSubmit={registerUser}>
                    <input type="text" name="username" placeholder="Enter Username" className="username-input"></input>
                    <input type="email" name="email" placeholder="Enter Email" className="email-input"></input>
                    <input type="password" name="password1" placeholder="Enter Password" className="password-input"></input>
                    <input type="password" name="password2" placeholder="Enter Password again" className="password-input"></input>
                    <input type="submit"></input>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;