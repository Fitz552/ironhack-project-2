import { useParams } from "react-router"
import Navbar from "./Navbar"

function AlbumPage () {
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            <Navbar />
            <h1>This is the AlbumPage</h1>
        </div>
    )
}

export default AlbumPage