import { Notifications, AccountCircle } from '@mui/icons-material';
import { Tooltip, Badge, ClickAwayListener } from '@mui/material';
import "../styles/Navbar.css";
import getRoleORImageOREmailORId from '../getRole';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetUserNotifications } from '../endPointUrls';

function Navbar() {
    const imagePath = getRoleORImageOREmailORId(2);
    const userId = getRoleORImageOREmailORId(4);
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${GetUserNotifications}${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    }, [userId]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <h1 className="page-title">Society Connect</h1>
                <div className="nav-items-right">
                    <ClickAwayListener onClickAway={closeDropdown}>
                        <div className="notification-wrapper">
                            <Tooltip title="Notifications">
                                <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                                    <Badge badgeContent={notifications.filter(n => !n.is_read).length} color="error">
                                        <Notifications />
                                    </Badge>
                                </div>
                            </Tooltip>

                            {showDropdown && (
                                <div className="notification-dropdown">
                                    {notifications.length > 0 ? (
                                        notifications.map((n, idx) => (
                                            <div key={idx} className={`notification-item ${n.is_read ? 'read' : 'unread'}`}>
                                                {n.message}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="notification-empty">No notifications</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </ClickAwayListener>

                    <Tooltip title="Profile">
                        <a href="#" className="nav-item">
                            {imagePath ? (
                                <img src={imagePath} alt="Profile" className="profileImage" />
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
