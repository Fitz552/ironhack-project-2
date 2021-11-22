import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div className = "bg-secondary row">
            <div className = "col">
                <Link className = "m-2" to = "/">nome</Link>
            </div>
            <div className = "col">
                <Link to = "/albuns">Album List</Link>
            </div>
        </div>
    )
}

export default Navbar