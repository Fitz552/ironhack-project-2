import { useParams } from "react-router"
import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'

function AlbumPage () {
    const {id} = useParams()
    const [loaded, setLodead] = useState(false) // criar um state albuns e defini-lo como uma array vazia e a função setLoaded e alterar para true
    // criar um state albuns e defini-lo como uma array vazia e a função setAlbuns para altera-lo
    const [content, setContent] = useState([])
    const [reviews, setReviews] = useState([])
    // useEffect para executar a função passada apenas na inicialização
        useEffect (() => {
            // usar comando get na coleção albuns do DB através da API com axios
            axios.get(`https://ironrest.herokuapp.com/albuns/${id}`)
            //then recebe uma função que será executada após a conclusão da instrução anterior(no caso, axios.get)
            .then ((response) => {
                // chamei a função setAlbuns para alterar o state de albuns para o valor recebido após a resposta da API
                setContent(response)
                
    
            }
            )
            .then( () => {
                setLodead(true) //enquanto o objeto estiver vazio não retorna nada pq é falso, a função setLoaded faz o programa aguardar os elementos do objeto para retornar
            })

            const reviwes = axios.get(`https://ironrest.herokuapp.com/createCollection/reviews${id}`)

            .then((response) => {
                setReviews(response)
            }
            )

            
        }
        , [])
    
    return (
        <div>
                <Navbar />
            <h1>This is the AlbumPage</h1>
            {
                loaded && //condicinal
                <div>
                <img src={content.data.images[0].url}/>
                <p>{content.data.name}</p>
                <p>{content.data.artists[0].name}</p>
            
                </div>
            }
            {
                reviews &&
                <div>
                   <p>{reviews.}</p> 
                </div>
            }

        </div>
    )
}

export default AlbumPage