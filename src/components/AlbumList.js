import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'

function AlbumList () {
    const [albuns, setAlbuns] = useState([{_id: '619be1cb21b7950017ceeb2b', 'pearl jam': 'lightning bolt'}])
    let res = [{_id: '619be1cb21b7950017ceeb2b', 'pearl jam': 'lightning bolt'}];
    // GET em "https://ironrest.herokuapp.com/albuns"
    useEffect (() => {
        axios.get("https://ironrest.herokuapp.com/albuns")        
        .then ((response) => {
            res = response.data;
            
            setAlbuns(response.data)
            
        }
        )
        .then (() => {
            console.log(res)
        })
    }
    , [])
    console.log(res)
    return(
        <div>
            <Navbar />
            <h1>{albuns[0]["pearl jam"]}</h1>
            <h1>{res[0]["pearl jam"]}</h1>
        </div>
    )
}

export default AlbumList