import axios from 'axios'
import {useEffect} from "react"
import Navbar from "./Navbar"

function DeleteCollection () {

    useEffect(() =>{

        axios.get("https://ironrest.herokuapp.com/reviews")
        .then(response => {
            response.data.map(response => {
                //axios.delete(`https://ironrest.herokuapp.com/reviews/${response._id}`)
                //.then(response => console.log(response))
                return response
            })
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


export default DeleteCollection;