import axios from 'axios'
import {useEffect, useState} from "react"
import Navbar from "../src/components/Navbar"

function PopulateCollection () {
    const [artist, setArtist] = useState("Anitta") //Current artist
    const [artists, setArtists] = useState([]) //Already included artists 

    useEffect(() =>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=6abbbf59ff6505daf1ff65a7d5d92861&artist=${artist}&limit=2&format=json&raw=true`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            //axios.post("https://ironrest.herokuapp.com/albuns", response.album)
            //axios.delete("https://ironrest.herokuapp.com/albuns/619cefd3cdf92e00177dd0fd")
            //console.log(response.topalbums.album)
            response.topalbums.album.map(album => {
                fetch( `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=6abbbf59ff6505daf1ff65a7d5d92861&artist=${artist}&album=${album.name}&format=json`)
                .then(response => {return response.json()})
                .then (data => axios.post("https://ironrest.herokuapp.com/albuns", data.album))
                .catch (error => console.log(error))
                //axios.post("https://ironrest.herokuapp.com/albuns", album)
                return album
            })
        })
        .then (()=> {
            let aux = [...artists]
            aux.push(artist)
            setArtists(aux)
        })
        .then (()=> {
            fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=6abbbf59ff6505daf1ff65a7d5d92861&artist=${artist}&limit=40&format=json&raw=true`)
            .then ( response => {
                return response.json()
            })
            .then(data => {
                
                let filtered = data.similarartists.artist.filter(singer => {return !artists.includes(singer.name)})
                if (filtered.length > 0) {
                    setArtist(filtered[0].name)
                }
            })
        })
        .catch (error => console.log(error))
    }, [artist
    , artists]) // haven't tested with the artists dependecy. Added to remove the warning.
                       

return (
    <div>
        <Navbar />
        <h1>This is Populate</h1>
    </div>
)
}


export default PopulateCollection;