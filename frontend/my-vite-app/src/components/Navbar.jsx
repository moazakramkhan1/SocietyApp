import { Notifications, AccountCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import "../styles/Navbar.css";
import getRoleORImageOREmailORId from '../getRole';
import { mainEndpoint } from '../endPointUrls';

function Navbar() {
    const imagePath = getRoleORImageOREmailORId(2);
    const completeURL = imagePath ? `${mainEndpoint}${imagePath}` : null;
    console.log(imagePath)
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
