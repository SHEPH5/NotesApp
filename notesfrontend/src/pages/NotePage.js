import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {ReactComponent as Arrowleft} from '../assets/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const NotePage = () => {
    let {id} = useParams();
    let {user} = useContext(AuthContext)
    let {authTokens, logoutUser} = useContext(AuthContext)

    let Navigate = useNavigate();

    let [note, setNote] = useState([null])

    useEffect(() =>{
        getNote();
    }, [id])

    let createNote = async () =>{
        try {
            const response = await fetch('/api/notes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(note)  // Include the note data in the request body
            });
    
            if (response.status === 201) { // Check for a 201 (Created) status code for successful creation
                const data = await response.json();
                setNote(data);
            } else if (response.status === 401) { // Check for a 401 (Unauthorized) status code
                logoutUser();
            } else {
                // Handle other status codes or errors
                console.error('Failed to create note:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

 

    let getNote = async () =>{
        if (id==='new') return 
        let response = await fetch(`/api/notes/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }})

        let data = await response.json()

        
        if (response.status === 200){
            setNote(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();

        }

        setNote(data)

    }

    let updateNote = async () =>{
       let response = fetch(`/api/notes/${id}/` ,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify(note)
       })
       
       if (response.status === 200){
        setNote(note)
    }else if(response.statusText === 'Unauthorized'){
        logoutUser();

    }
    }

    let deleteNote= async () =>{
        fetch(`/api/notes/${id}/`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },

        },  Navigate('/'))
       
    }
    let handleSubmit = () =>{
        if (id!=='new' && !note.body ){
            deleteNote()
        }else if(id !=='new'){
            updateNote()
        }else if(id==='new' && note !== null){
            createNote()
        }

        Navigate('/')
    }
 
    
    return(
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Arrowleft onClick={handleSubmit}/>
                </h3>
                {id != 'new' ? (
                    <button onClick={deleteNote}>DELETE</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
                
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value })}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;