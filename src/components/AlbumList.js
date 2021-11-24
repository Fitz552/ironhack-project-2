import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

function AlbumList () {
    // criar um state albuns e defini-lo como uma array vazia e a função setAlbuns para altera-lo
    const [albuns, setAlbuns] = useState([])
    // useEffect para executar a função passada apenas na inicialização
    useEffect (() => {
        // usar comando get na coleção albuns do DB através da API com axios
        axios.get("https://ironrest.herokuapp.com/albuns")
        //then recebe uma função que será executada após a conclusão da instrução anterior(no caso, axios.get)
        .then ((response) => {
            // chamei a função setAlbuns para alterar o state de albuns para o valor recebido após a resposta da API
            setAlbuns(response.data)
            console.log(albuns)
            console.log(albuns[0])

        }
        )
    }
    , [])
    
    return(
        <div>
            <Navbar />
        
            <h1>This is Album List</h1>
            

            {
                albuns.map((album) => {
                    return (
                        <div>
                            <Link to={`/albuns/${album._id}`}>
                                <img src={album.images[0].url}/>
                                <p>{album.name}</p>
                                <p>{album.artists[0].name}</p>
                            </Link>
                        </div>
                        
                    )
                }
            
                )
            }
            
        </div>)}
    


export default AlbumList