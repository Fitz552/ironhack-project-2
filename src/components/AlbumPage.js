import { useParams } from "react-router"
import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'
import Form from "./Form"
import spinner from "../images/spinner.gif"
import star from "../images/goldstar.png"


function AlbumPage () {
    const {id} = useParams()
    const [loaded, setLodead] = useState(false)
    const [album, setAlbum] = useState([])
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({grade: 1, review:""})
    const [update, setUpdate] = useState("");
    const [updatedReview, setUpdatedReview] = useState({});
    const [reviewAverage, setReviewAverage] = useState(0);

        useEffect (() => {

            axios.get(`https://ironrest.herokuapp.com/albuns/${id}`)
            .then ((response) => {
                setAlbum(response.data)
                setLodead(true) 
            }
            )
            .catch(error => {console.log(error)})

            axios.get(`https://ironrest.herokuapp.com/reviews?albumID=${id}`)
            .then((response) => {
                let filteredRes = response.data.filter(review => {
                    return review.albumId === id
                })
                setReviews(filteredRes)
            })
            .catch(error => console.log(error))    

        }, [id])

        useEffect(() => {
            let aux = [...reviews]
            let average = 0
            if (aux.length>0) {
                average = aux.reduce((a, b) => {
                    return (a+parseFloat(b.grade))
                }, 0)/aux.length
            }
            setReviewAverage((Math.round(average * 10) / 10).toFixed(1))
        }, [reviews])


        function onDelete(event) {
            axios.delete(`https://ironrest.herokuapp.com/reviews/${event.target.id}`)
            .then( () => {
                return axios.get("https://ironrest.herokuapp.com/reviews")
            })
            .then(response => {
                let filteredRes = response.data.filter(review => {
                    return review.albumId === id
                })
                setReviews(filteredRes)
            })
            .catch(error => console.log(error))
        }
    
        function onSubmit(event) {
            event.preventDefault()
            axios.post("https://ironrest.herokuapp.com/reviews", newReview)
            .then (() => {
                return axios.get("https://ironrest.herokuapp.com/reviews")
            })
            .then (response => {
                let filteredRes = response.data.filter(review => {
                    return review.albumId === id
                })
                setReviews(filteredRes)
                setNewReview({grade: 1, review:"", albumId:id})
            })
            .catch(error => console.log(error))
        }
    
        function onChange(event) {
            let aux = {...newReview}
            aux.albumId = id
            aux[event.target.name] = event.target.value
            setNewReview(aux)
        }
    
        function onEdit(event) {
            //aux = aux.push(event.target.id.slice(5)) 
            let aux = event.target.id.slice(5)
            setUpdate(aux)
            let filter = reviews.filter(review => {return (review._id === event.target.id.slice(5))})
            setUpdatedReview(filter[0])
        }   
    
        function onEditChange(event) {
            let aux = {...updatedReview};
            aux.albumId = id;
            aux[event.target.name] = event.target.value
            setUpdatedReview(aux)
        }
    
        function onEditSubmit(event){
            event.preventDefault();
            let reviewId = event.target.id.slice(5)
            let aux = {...updatedReview}
            delete aux._id
            axios.put(`https://ironrest.herokuapp.com/reviews/${reviewId}`, aux)
            .then (() => {
                setUpdate("")
                
            }).then (() => {
                return axios.get("https://ironrest.herokuapp.com/reviews")
            })
            .then (response => {
                let filteredRes = response.data.filter(review => {
                    return review.albumId === id
                })
                setReviews(filteredRes)
            })
            .catch(error => console.log(error))
    
        }
    
    return (
        <div>
            <Navbar />
            {loaded ? 
                <div className="row card m-1">
                    <div className="col d-flex justify-content-between brand mb-2">
                        <div className="col">
                            <p className = "h3 text-white">{album.name} by {album.artist}</p>
                        </div>
                        <div className="col d-flex">
                            <div className="row ms-auto my-auto">
                                <img src={star} alt="classification star my-auto" className="small-image col"/>
                                <p className="h3 text-white col my-auto">{reviewAverage} </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className = "col-md-4 col-sm-6 justify-content-center">
                            <div className="col-12">
                                <p className="text-center light h5">{album.name}</p>
                                <div className="d-flex justify-content-center">
                                    <img className="album-image" src={album.image[2]["#text"]} alt={album.name}/>
                                </div>
                            </div>
                            <p className="col-12 light text-center mt-1">Artist</p>
                            <p className="col">{album.artist}</p>
                            <p className="col-12 light text-center mt-1">Tags</p>
                            <div>
                                {album.tags?
                                    album.tags.tag.length>1?
                                        album.tags.tag.map(specific => {
                                            return(
                                                <div key={specific.name}>{specific.name}</div>
                                            )
                                        })
                                        :
                                        <div key={album.tags.tag.name}>{album.tags.tag.name}</div>
                                    :
                                    <span>No tags</span>
                                }
                            </div>

                        </div>
                        <div className="col">
                            <div className="col-12">
                                <p className="light">Summary</p>
                                <p dangerouslySetInnerHTML={{ __html: album.wiki? album.wiki.summary: "No Info"}}></p>
                            </div>
                            {album.tracks? 
                                <table className="table table-borderless">
                                    <thead>
                                        <th scope = "col" className="light">
                                            Track
                                        </th>
                                        <th scope = "col" className="light">
                                            Duration
                                        </th>
                                    </thead>
                                    <tbody>
                                        {album.tracks.track.length>0?
                                            album.tracks.track.map(track=>{
                                                return (
                                                    <tr key={track.name}>
                                                        <td>{track.name}</td>
                                                        <td>{Math.floor(track.duration/60)}m {track.duration%60}s</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr key={album.tracks.track.name}>
                                                <td>{album.tracks.track.name}</td>
                                                <td>{Math.floor(album.tracks.track.duration/60)}m{album.tracks.track.duration%60}s</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                :
                                <div>No Info</div>
                            }
                        </div>
                    </div>

                </div>

            :

                <div className="d-flex justify-content-center">
                    <img src={spinner} alt="loading spinner"/>
                </div>
            }
            <div>
                <p className="col d-flex justify-content-center mx-2 h4">Reviews</p>
            </div>
            <div className="row d-flex justify-content-center align-items-center bg-light">
                    {
                        reviews.map( review => {
                            if (!update.includes(review._id)) {
                                return (
                                    <div className = "col-10" key={review._id}>
                                        <div className="row d-flex justify-content-between align-items-center">     
                                            <div className="col d-flex justify-content-start">
                                                <p className="text-muted mx-2">Rating </p>
                                                <p>{review.grade}</p>
                                            </div>
                                            <div className = "col d-flex justify-content-end">
                                                <button className="btn btn-light btn-sm m-2" id={`edit-${review._id}`} onClick={onEdit}>Edit</button>
                                                <button className="btn btn-light btn-sm m-2" id={review._id} onClick={onDelete}>Delete</button>
                                            </div>
                                        </div>
                                        <div className="border border-light p-2">
                                            <p className="text-muted">Review</p>
                                            <p>{review.review}</p>
                                        </div>
                                        <hr/>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className = "col-10 " key={review._id}>
                                        <Form type="edit" review={updatedReview} placeholder={review.review} onChange={onEditChange} onSubmit={onEditSubmit} reviewId = {review._id}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className="col d-flex justify-content-center align-items-center">
                    <Form onSubmit={onSubmit} onChange={onChange} review={newReview} type="new"/>
                </div>
        </div>
    )
}

export default AlbumPage