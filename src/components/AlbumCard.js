import {Link} from "react-router-dom"
function AlbumCard(props) {
    return (
    <div className = "card m-2 col-md-3 col-sm-6">
        <Link to= {`/albuns/${props.album._id}`} className="clean">
            <img src={props.album.image[2]['#text']} alt={props.album.name} className="card-img-top album-image"/>
            <div className = "card-body">
                <div className="row d-flex justify-content-between">
                    <p className="col text-muted">Album</p>
                    <p className="col h6 text-left text-dark">{props.album.name}</p>
                </div>
                <div className="row d-flex justify-content-between">
                    <p className="col text-muted">Artist</p>
                    <p className="col h6 text-left text-dark">{props.album.artist}</p>
                </div>
            </div>
        </Link>
    </div>
    )
}

export default AlbumCard