import { Notifications, AccountCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import "../styles/Navbar.css";
import getRoleORImageOREmailORId from '../getRole';

function Navbar() {
    const imagePath = getRoleORImageOREmailORId(2);
    const completeURL = imagePath ? `http://localhost:8000${imagePath}` : null;
    console.log(completeURL)
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
                            {imagePath ? (
                                <img src={completeURL} alt="Profile" className="profileImage" />
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
