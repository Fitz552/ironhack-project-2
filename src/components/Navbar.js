import {Link} from "react-router-dom"
import logo from "../images/Logo.png"

function Navbar() {
    return (
        <div className = "row brand d-flex justify-content-between p-1">
            <div className="col">
                <Link to="/" className="clean">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            <div className="col-md-2 col-sm-4 d-flex justify-content-center align-items-center">
                <div className="row mx-1">
                    <Link to="/albuns" className="col clean d-flex align-items-center border border-white">
                        <p className="text-light">Albuns</p>
                    </Link>
                    <Link to="/" className="col clean">
                        <p className="text-light">Home</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar