import { useState } from 'react'
import './App.css'

function App() {
    const [contact, setContacts] = useState([]);

    const fetchContacts = async () => {
        const response = await fetch('http://127.0.0.1:5000/contacts',{
            method: "GET"
        });

        const data = await response.json()
        setContacts(data.contacts)
    }
  return (
    <>

    </>
  )
}

export default App
