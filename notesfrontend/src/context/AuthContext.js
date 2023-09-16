import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) =>{


    let [authTokens, setAuthtokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')): null)
    let [loading, setLoading] = useState(true)
    let Navigate = useNavigate();


    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch('rest-auth/registration/',{
            method: 'POST',
            headers: {
             'Content-Type': 'application/json' }
        ,
        body: JSON.stringify({'username': e.target.username.value, 'email': e.target.email.value, 'password1': e.target.password1.value, 'password2':e.target.password2.value })}
        )

        if (response.status === 204) {
            alert("Registration successful");
            Navigate('/')
          } 
        else{
            alert("Registration not successful");

        }
    }

    let loginUser = async (e) =>{
        e.preventDefault()

        let response = await fetch('api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value})

        })
        let data = await response.json()
        
        if(response.status === 200){
            setAuthtokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            Navigate('/')

        }else{
            alert('Something went wrong')
        }
        if(loading){
            setLoading(false)
        }
      
    }

    let logoutUser = () =>{
        setAuthtokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/login')
    }

    let updateToken = async () =>{
        console.log('update token called')
        
        let response = await fetch('api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})

        })
        let data = await response.json()

        if (response.status === 200){
            setAuthtokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else if(response.status == 'Unauthorized'){
            logoutUser();
        }

        if (loading){
            setLoading(false)
        }
    }
   

    let contextData = {
        user: user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        
        registerUser:registerUser,

    }

    
    useEffect(()=>{

        if (loading){
            updateToken();
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){ 
            updateToken();
        }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    },[authTokens, loading])


    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}


