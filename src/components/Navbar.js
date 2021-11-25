import {Link} from "react-router-dom"
import logo from "../images/Logo.png"

function Navbar() {
    return (
        <div className = "row brand d-flex justify-content-between align-items-center p-1">
            <div className="col-md-4 ">
                <Link to="/" className="clean">
                    <img src={logo} alt="logo" className="logo img-fluid"/>
                </Link>
            </div>
            <div className="col-md-2 d-flex  justify-content-center">
                <Link to="/albuns" className="clean mx-2">
                    <p className="text-light my-auto">Albuns</p>
                </Link>
                <Link to="/" className="clean mx-2">
                    <p className="text-light my-auto">Home</p>
                </Link>

            </div>
        </div>
    )
}

export default Navbar