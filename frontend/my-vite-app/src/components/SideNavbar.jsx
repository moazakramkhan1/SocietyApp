import { Home, AccountCircle, ExitToApp, AddCircle, RequestPage } from '@mui/icons-material';
import '../styles/SideNavbar.css';
import logo from '../static/logo.jpg';
import { AboutScreenRoute, HomeRoute, LoginSignupScreenRoute, SocietiesScreenRoute, MemberRequestScreenRoute } from '../routes';
import { Tooltip } from '@mui/material';
import getRoleORImageOREmailORId from '../getRole';



function SideNavbar() {
    const userRole = getRoleORImageOREmailORId(1);
    return (
        <div className="side-navbar">
            <div className="side-navbar-content">
                <a href={AboutScreenRoute} className="nav-logo">
                    <img src={logo} alt="logo" className="circle-logo" />
                </a>
                <Tooltip title="Home" placement='right'>
                    <a href={HomeRoute} className="nav-item">
                        <Home />
                    </a>
                </Tooltip>
                <Tooltip title="Profile" placement='right'>
                    <a href="#" className="nav-item">
                        <AccountCircle />
                    </a>
                </Tooltip>
                <Tooltip title='Join Societies' placement='right'>
                    <a href={SocietiesScreenRoute} className="nav-item">
                        <AddCircle />
                    </a>
                </Tooltip>


                <Tooltip title={userRole === 'admin' ? 'Manage Society' : 'My Requests'} placement='right'>
                    <a href={MemberRequestScreenRoute} className="nav-item">
                        <RequestPage />
                    </a>
                </Tooltip>


                <Tooltip title='Logout' placement='right'>
                    <a href={LoginSignupScreenRoute} className="nav-item">
                        <ExitToApp />
                    </a>
                </Tooltip>

            </div>
        </div>
    );
}

export default SideNavbar;
