import Navbar from "./Navbar"
import logo from "../images/Logo.png"
import browse from "../images/magnifying-glass.png"
import discover from "../images/treasure.png"
import rate from "../images/star.png"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import axios from "axios"

function HomePage () {
    let nav = 10
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
        })
        let data= Object.keys(displayTags).sort(function(a,b){return displayTags[b]-displayTags[a]})
        console.log(data)
        setTags(data)
    })
    }, [])

    function onSearch(event) {
        event.preventDefault()
        navigate(`/albuns?search=${search}`)
    }

    function onChange(event) {
        setSearch(event.target.value)
        console.log(search)
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
        <div className = "light row d-flex justify-content-center mt-1">
            <div className="col-10 d-flex justify-content-center">
                <img src={logo} alt="logo" className="img-fluid"/>
            </div>
            <div className = "col-10">
                <div className="row d-flex justify-content-around">
                    <div className="col-md-3 col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <div className = "col-5 rounded-circle brand p-2 d-flex justify-content-center">
                            <img className="home-image p-2" src={browse} alt="Magnifying Glass"/>
                        </div>
                        <p className="h5 text-secondary">Browse</p>
                        <p className="h6 text-muted" style={{"textAlign": "justify"}}>Browse through a big list of albums from a great range of genres</p>
                    </div>
                    <div className="col-md-3 col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <div className = "col-5 rounded-circle brand p-2 d-flex justify-content-center">
                            <img className="home-image p-2" src={discover} alt="Treasure Chest"/>
                        </div>
                        <p className="h5 text-secondary">Discover</p>
                        <p className="h6 text-muted" style={{"textAlign": "justify"}}>Check what's behind each album and what people have to say about it</p>
                    </div>

                    <div className="col-md-3 col-sm-6 d-flex flex-column justify-content-center align-items-center p-2 m-2">
                        <div className = "col-5 rounded-circle brand p-2 d-flex justify-content-center">
                            <img className="home-image p-2" src={rate} alt="Star"/>
                        </div>
                        <p className="h5 text-secondary">Rate</p>
                        <p className="h6 text-muted" style={{"textAlign": "justify"}}>Tell other people what you think about the albums you've heard</p>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="col-10 my-2">
                <div className="row d-flex align-items-center my-2">
                    <label><strong>Start by searching an album or artist</strong></label>
                    <form  className = "d-flex flex-column" onSubmit={onSearch}>
                        <input className="col form-control my-2" type="text" placeholder= "Search by album or artist" onChange={onChange} required/>
                        <button className="col-12 btn mx-auto border border-dark">Search</button>
                    </form>
                </div>
            </div>

            <div className="col-10">
                <p><strong>Or by selecting a genre</strong></p>
                <div className="row align-items-center justify-content-center">
                    {tags.map((tag, index) =>{
                        if (index <numberTags){
                            return(
                                <button className="col-md-2 col-sm-4 m-2 btn btn-sm btn-outline-secondary" key={tag} onClick={onTag}>{tag}</button>
                            )
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