import {Link} from "react-router-dom"
import logo from "../images/Logo.png"
import {useState} from "react"

function Navbar() {
    const [collapsed, setCollapsed] = useState(true)

    const handleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (        
        <nav className = "navbar navbar-expand-lg navbar-dark bg-secondary brand m-0 p-0">
            <div className="navbar navbar-brand ">
                <Link to="/" className="clean">
                    <img src={logo} alt="logo" className="logo img-fluid"/>
                </Link>
            </div>
            <button className=" custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!collapsed ? true : false} aria-label="Toggle navigation" onClick={handleCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${collapsed?"collapse ":""} navbar-collapse`} id="navbarNav">
                <div className = "navbar-nav ms-auto">
                    <div className = "nav-item mx-2 ms-auto">
                        <Link to="/albuns" className="clean">
                            <p className="text-light my-auto">Albuns</p>
                        </Link>
                    </div>
                    <div className = "nav-item mx-2  ms-auto">
                        <Link to="/" className="clean">
                            <p className="text-light my-auto">Home</p>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar