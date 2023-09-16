import React, {useEffect, useState} from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/Addbutton";
import  {useContext} from "react";
import AuthContext from "../context/AuthContext";


const NoteListPage = () => {
    let {user} = useContext(AuthContext)
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [notes, setNotes ] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();

        }
 
    }

    return(
        <div className="notes">
            <div className="notes-header">
               <h2 className="notes-title">&#9782; Notes</h2>
               <p className="notes-count">{notes.length}</p>
            </div>
            <div className="user-name">
                {user && <h2>Hello {user.username}</h2>  } 
            </div>
            <div className="notes-list">
                {notes.map((note, index) =>( 
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NoteListPage;