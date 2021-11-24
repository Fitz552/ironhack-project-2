import Navbar from "./Navbar"
import {useState, useEffect} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

function AlbumList() {
    const display = 15
    const [albuns, setAlbuns] = useState([])
    const [search, setSearch] = useState("")
    const [filteredAlbuns, setFilteredAlbuns] = useState([])
    const [pagination, setPagination] = useState(display)



    useEffect(()=>{
        axios.get("https://ironrest.herokuapp.com/albuns")
        .then((response)=> {
            setAlbuns(response.data)
            setFilteredAlbuns(response.data)
            console.log(response.data)
        })   
        .then( () => {
        let aux = [...albuns]
        if (search !=="") {
            aux = aux.filter(album => {
                let name = album.name.toLowerCase()
                let artist = album.artist.name.toLowerCase()
                return (name.includes(search.toLowerCase()) || artist.includes(search.toLowerCase()))
            })
            setFilteredAlbuns(aux)
        }
        })
        .then(()=> {
            console.log(albuns)
        })
        .catch(error => console.log(error))

    },[search])

    function onChange(event) {
        setSearch(event.target.value)
        setPagination(display)
    }

    function onLoadMore() {
        setPagination(pagination+display)
    }

    function toTop() {
        window.scrollTo(0,0)
    }

    return(
        <div>
            <Navbar/>
            <div className="row m-2 d-flex justify-content-center">
                <div className="col-10">
                    <input className="form-control" type="text" placeholder= "Search by album or artist" onChange={onChange}/>
                </div>
            </div>
            <div className="row m-2 d-flex justify-content-center">
                { 
                    filteredAlbuns.map((album, index)=> {
                        if (index<pagination) {
                            {/*< div className = "m-2 pt-1 col-md-3 col-sm-6 border border-dark rounded d-flex justify-content-center bg-light" key={album._id}>*/}
                            return(
                                <div className = "card m-2 col-md-3 col-sm-6">
                                    <Link to= {`/albuns/${album._id}`} className="clean">
                                        <img src={album.image[2]['#text']} alt={album.name} className="card-img-top album-image"/>
                                        <div className = "card-body">
                                            <div className="row d-flex justify-content-between">
                                                <p className="col text-muted">Album</p>
                                                <p className="col h6 text-left text-dark">{album.name}</p>
                                            </div>
                                            <div className="row d-flex justify-content-between">
                                                <p className="col text-muted">Artist</p>
                                                <p className="col h6 text-left text-dark">{album.artist}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="m-2 d-flex justify-content-center">
                <button className="col-9 btn btn-secondary" onClick={onLoadMore}>Load More</button>
            </div>
            <div className="m-2 d-flex justify-content-center">
                <button className="col-9 btn btn-light" onClick={toTop}>Back to Top</button>
            </div>
        </div>
    )
}

export default AlbumList