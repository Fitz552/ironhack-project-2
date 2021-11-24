import axios from 'axios'
import {useEffect, useState} from "react"
import Navbar from "./Navbar"

function DeleteCollection () {
    const [state, setState] = useState([]);
    const [artist, setArtist] = useState("Nirvana")
    const [artists, setArtists] = useState([])

    useEffect(() =>{

        axios.get("https://ironrest.herokuapp.com/albuns")
        .then(response => {
            response.data.map(response => {
                axios.delete(`https://ironrest.herokuapp.com/albuns/${response._id}`)
                .then(response => console.log(response))
            })
        })
        .catch (error => console.log(error))
    }, [artist])
                       

return (
    <div>
        <Navbar />
        <h1>This is DeleteCollection</h1>
    </div>
)
}


export default DeleteCollection;