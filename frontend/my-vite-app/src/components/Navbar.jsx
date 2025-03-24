import { Notifications, AccountCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import "../styles/Navbar.css";
import axios from 'axios';
import getRoleORImageOREmailORId from '../getRole';

function Navbar() {
    let imageURL = getRoleORImageOREmailORId(2);
    const image = async () => {
        try {
            let response = await axios.get(imageURL)
            console.log(response)
        }
        catch (e) {
            console.error("sorry error occured")
        }
    }
    image()
    return (
        <div className="navbar">
            <div className="navbar-content">
                <h1 className="page-title">Society Connect</h1>
                <div className="nav-items-right">
                    <Tooltip title="Home">
                        <a href="#" className="nav-item">
                            <Notifications />
                        </a>
                    </Tooltip>
                    <Tooltip title="Profile">
                        <a href="#" className="nav-item">
                            {imageURL ? (
                                <img src={"image"} alt="Profile" />
                            ) : (
                                <AccountCircle fontSize="large" />
                            )}
                        </a>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
