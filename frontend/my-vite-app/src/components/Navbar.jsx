import { Notifications, AccountCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import "../styles/Navbar.css";
import getRoleORImageOREmail from '../getRole'

function Navbar() {
    let imageUrl = getRoleORImageOREmail(2);
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
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" />
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
