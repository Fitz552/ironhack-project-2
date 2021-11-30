import Navbar from "./Navbar"
import logo from "../images/Logo.png"
import browse from "../images/magnifying-glass.png"
import discover from "../images/treasure.png"
import rate from "../images/star.png"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import axios from "axios"


function HomePage () {
    let nav = 20
    let navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const [numberTags, setNumberTags] = useState(nav)


    useEffect(() => {
        //Checks most recurrent tags to be displayed 
        let displayTags = {}
        axios.get("https://ironrest.herokuapp.com/albuns")
        .then (response => {
        response.data.map(album => {
            if (album.tags) {
                if (album.tags.tag.length > 1) {
                    album.tags.tag.map(tag => {
                        if (displayTags[tag.name]) {
                            displayTags[tag.name] += 1
                        }
                        else {
                            displayTags[tag.name] = 1
                        }
                    return tag
                    })
                }
                else {
                    if (displayTags[album.tags.tag.name]) {
                        displayTags[album.tags.tag.name] += 1
                    }
                    else {
                        displayTags[album.tags.tag.name] = 1
                    }
                }
            }
            return album
        })
        let data= Object.keys(displayTags).sort(function(a,b){return displayTags[b]-displayTags[a]})
        setTags(data)
        })
        .catch(error => console.log(error))
    }, [])

    function onSearch(event) {
        event.preventDefault()
        navigate(`/albuns?search=${search}`)
    }

    function onChange(event) {
        setSearch(event.target.value)
    }

    function onTag(event) {
        navigate(`/albuns?tag=${event.target.innerHTML}`)
    }

    function onLoadMore() {
        setNumberTags(numberTags+nav)
    }

    return (
    <div>
        <Navbar />
        <div className = "row">
            <div className="homepage-background-image bg-image d-flex flex-column justify-content-around">
                <div className="col-10 mx-auto d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="logo" className="img-fluid"/>
                    <p className="h4 text-secondary text-center"> Explore and discover new albums</p>
                </div>
                <div className="col-10 mx-auto my-2">
                    <div className="row d-flex align-items-center my-2">
                        <label className="h4"><strong>Start by searching an album or artist</strong></label>
                        <form  className = "d-flex flex-column" onSubmit={onSearch}>
                            <input className="col form-control my-2" type="text" placeholder= "Search by album or artist" onChange={onChange} required/>
                            <button className="col-12 btn mx-auto border border-dark">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="brand py-2">
                <div className="row d-flex justify-content-around my-2 py-2">
                    <div className="col-md-2 my-auto col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <img className="home-image my-2 p-2" src={browse} alt="Magnifying Glass"/>
                        <p className="h2 text-white my-2 py-2">Browse</p>
                        <p className="h5 text-light my-2 py-2 text-center">Browse through a big list of albums from a great range of genres</p>
                    </div>
                    <div className="col-md-2 my-auto col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <img className="home-image my-2 p-2" src={discover} alt="Treasure Chest"/>
                        <p className="h2 text-white my-2 py-2 text-center">Discover</p>
                        <p className="h5 text-white text-center">Check what's behind each album and what people have to say about it</p>
                    </div>

                    <div className="col-md-2 my-auto col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <img className="home-image my-2 p-2" src={rate} alt="Star"/>
                        <p className="h2 text-white my-2 py-2 text-center">Rate</p>
                        <p className="h5 text-white text-center">Tell other people what you think about the albums you've heard</p>
                    </div>
                </div>
            </div>

            <div className="light py-2">
                <p className="h4 text-center"><strong>Surf by genre</strong></p>
                <div className="row align-items-center justify-content-center">
                    {                 
                    tags.map((tag, index) =>{
                        if (index <numberTags){
                            return(
                                <button className="col-md-2 col-4 m-2 btn btn-sm btn-outline-secondary" key={tag} onClick={onTag}>{tag}</button>
                            )
                        }
                        else {
                            return (<span key={tag}></span>)
                        }
                    })}
                </div>
                <div className="m-2 d-flex justify-content-center">
                    <button className="col-9 mx-auto btn" onClick={onLoadMore}>Load More</button>
                </div>
            </div>
        </div>
    </div>
)
}


export default HomePage;