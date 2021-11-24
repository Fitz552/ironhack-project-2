import axios from 'axios'
import {useEffect, useState} from "react"
import Navbar from "./Navbar"

function RemoveDuplicates () {
    const [state, setState] = useState([]);
    const [artist, setArtist] = useState("Nirvana")
    const [artists, setArtists] = useState([])

    useEffect(() =>{

        axios.get("https://ironrest.herokuapp.com/albuns")
        .then(response => {
            let aux = response.data
            for (let i=0; i<aux.length-1; i++) {
                console.log(aux[i])
                let next = aux.slice(i+1).filter(element => {return (element.name === aux[i].name)})
                if (next.length>0){
                    axios.delete(`https://ironrest.herokuapp.com/albuns/${next[0]._id}`)
                }
            }
        })
        .catch (error => console.log(error))
    }, [])
                       

return (
    <div>
        <Navbar />
        <h1>This is DeleteCollection</h1>
    </div>
)
}


export default RemoveDuplicates;