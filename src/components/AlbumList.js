import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

function AlbumList () {
    const [albuns, setAlbuns] = useState([])
    // GET em "https://ironrest.herokuapp.com/albuns"
    useEffect (() => {
        axios.get("https://ironrest.herokuapp.com/albuns")        
        .then ((response) => {  
            console.log(response)
            console.log(response.data)
            setAlbuns(response.data)         
        }
        )
        .then (() => {
            console.log(albuns)
        })
    }
    , [])

    return(
        <div>
            <Navbar />
            <div>
                {
                    albuns.map(album => {
                        return (
                            <div>
                                <Link to = {`/albuns/${album._id}` }>
                                    <img src={album.images[0].url}/>
                                    <p>{album.name}</p>
                                    <p>{album.artists[0].name}</p>
                                </Link>
                            </div>
                        )
                    })
                    
                }
            </div>
        </div>
    )
}

export default AlbumList