import axios from 'axios'
import {useEffect, useState} from "react"
import Navbar from "./Navbar"

function HomePage () {
    const [state, setState] = useState([]);

    useEffect(() =>{
    async function fetchTopics(){
        try {
            //const response = await axios.post("https://ironrest.herokuapp.com/albuns", {})
            //console.log(response)
            //setState([...response.data]); 
        } catch (err) {
               // console.error(err);
        }
            
    }                   
   
    fetchTopics(); 
}, []);
return (
    <div>
        <Navbar />
        <h1>This is HomePage</h1>
    </div>
)
}


export default HomePage;