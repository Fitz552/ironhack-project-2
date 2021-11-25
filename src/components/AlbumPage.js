import { useParams } from "react-router"
import Navbar from "./Navbar"
import axios from 'axios'
import {useEffect, useState} from 'react'


function AlbumPage () {
    const {id} = useParams()
    const [loaded, setLodead] = useState(false)
    const [album, setAlbum] = useState([])

        useEffect (() => {

            axios.get(`https://ironrest.herokuapp.com/albuns/${id}`)
            .then ((response) => {
                setAlbum(response.data)
                setLodead(true) 
            }
            )
        }, [])
    
    return (
        <div>
            <Navbar />
            {loaded &&
                <div className="row card m-2">
                    <div className="col-12 light mb-2">
                        <p className = "h3">{album.name} by {album.artist}</p>
                    </div>
                    <div className="row">
                        <div className = "col-md-4 col-sm-6 justify-content-center">
                            <div className="col-12">
                                <p className="d-flex justify-content-center light"><strong>{album.name}</strong></p>
                                <div className="d-flex justify-content-center">
                                    <img src={album.image[2]["#text"]} alt={album.name}/>
                                </div>
                            </div>
                            <p className="col-12 light d-flex justify-content-center mt-1">Artist</p>
                            <p className="col">{album.artist}</p>
                            <p className="col-12 light d-flex justify-content-center mt-1">Tags</p>
                            <div>
                                {album.tags?
                                    album.tags.tag.length>1?
                                        album.tags.tag.map(specific => {
                                            return(
                                                <div>{specific.name}</div>
                                            )
                                        })
                                        :
                                        <div>{album.tags.tag.name}</div>
                                    :
                                    <span>No tags</span>
                                }
                            </div>

                        </div>
                        <div className="col">
                            <div className="col-12">
                                <p className="text-muted light">Summary</p>
                                <p dangerouslySetInnerHTML={{ __html: album.wiki? album.wiki.summary: "No Info"}}></p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p className="text-muted light">Tracks</p>
                                    <ol>
                                        {album.tracks? 
                                            album.tracks.track.length>0?
                                                album.tracks.track.map(track=>{
                                                    return (
                                                        <li>{track.name}</li>
                                                    )
                                                })
                                                :
                                                <li>{album.tracks.track.name}</li>
                                            :
                                            <div>No Info</div>
                                        }
                                    </ol>
                                </div>
                                <div className="col">
                                    <p className="text-muted light">Duration</p>
                                    <ul>
                                    {album.tracks?
                                        album.tracks.track.length>0?
                                            album.tracks.track.map(track=>{
                                                return (
                                                    <li style={{"list-style-type": "none"}}>{Math.floor(track.duration/60)}m {track.duration%60}s</li>
                                                )
                                            })
                                            :
                                            <li style={{"list-style-type": "none"}}>{Math.floor(album.tracks.track.duration/60)}:{album.tracks.track.duration%60}</li>
                                        :
                                        <div>No Info</div>}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default AlbumPage