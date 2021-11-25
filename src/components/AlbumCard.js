import {Link} from "react-router-dom"
function AlbumCard(props) {
    return (
    <div className = "card m-2 col-md-3 col-sm-6">
        <Link to= {`/albuns/${props.album._id}`} className="clean">
            <div className="d-flex justify-content-center mb-2">
                <img src={props.album.image[2]['#text']} alt={props.album.name} className="album-image"/>
            </div>
            <div className = "row mx-1">
                <p className="col-6 text-muted d-flex justify-content-center align-items-center light">Album</p>
                <p className="col-6 font-weight-bold text-dark d-flex justify-content-center align-items-center bg-light">{props.album.name}</p>
                <p className="col-6 text-muted d-flex justify-content-center align-items-center light">Artist</p>
                <p className="col-6 font-weight-bold text-dark d-flex justify-content-center align-items-center bg-light">{props.album.artist}</p>
            </div>

        </Link>
    </div>
    )
}

export default AlbumCard