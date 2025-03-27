import React, { useEffect, useState } from 'react';
import { AllRequestsURL, AllMembersURL } from '../endPointUrls';
import axios from 'axios';
import {
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Badge,
    Box,
    Typography,
    CircularProgress,
    Stack,
    Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import getRoleORImageOREmailORId from '../getRole'

const MemberRequestComponent = () => {
    const [view, setView] = useState('requests');
    const [requests, setRequests] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = getRoleORImageOREmailORId(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            const responseRequest = await axios.get(AllRequestsURL);
            const responseMembers = await axios.get(AllMembersURL);
            setRequests(responseRequest.data);
            setMembers(responseMembers.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleViewChange = (event, newView) => {
        if (newView) setView(newView);
    };
    const statusColors = {
        Account: '#d4edda',
        Lead: '#f8d7da',
        Opportunity: '#fff3cd',
    };

    return (
        <Box
            sx={{
                marginTop: '60px',
                padding: 3,
                paddingLeft: '90px',
                width: '100%',
                height: 'calc(100vh - 60px)',
                backgroundColor: '#f5f6fa',
                overflowY: 'auto'

            }}
        >
            {userRole === 'admin' && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#444' }}>
                        {view === 'requests' ? 'Member Requests' : 'Society Members'}
                    </Typography>


                    <Box
                        sx={{
                            display: 'flex',
                            borderRadius: '30px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            padding: '4px',
                            transition: 'all 0.3s ease-in-out',
                        }}
                    >
                        <Button
                            onClick={() => setView('requests')}
                            sx={{
                                borderRadius: '20px !important',
                                textTransform: 'none !important',
                                backgroundColor: view === 'requests' ? '#30a7c9 !important' : 'transparent !important',
                                color: view === 'requests' ? '#fff !important' : '#333 !important',
                                px: '12px !important',
                                py: '8px !important',
                                fontWeight: 'bold !important',
                                transition: 'all 0.2s !important',
                                '&:hover': {
                                    backgroundColor: view === 'requests' ? '#1e88a8 !important' : '#f3f4f6 !important',
                                }
                            }}
                            startIcon={<NotificationsIcon />}
                        >
                            Requests
                        </Button>
                        <Button
                            onClick={() => setView('members')}
                            sx={{
                                borderRadius: '20px !important',
                                textTransform: 'none !important',
                                backgroundColor: view === 'members' ? '#30a7c9 !important' : 'transparent !important',
                                color: view === 'members' ? '#fff !important' : '#333 !important',
                                px: '12px !important',
                                py: '8px !important',
                                fontWeight: 'bold !important',
                                transition: 'all 0.2s !important',
                                '&:hover': {
                                    backgroundColor: view === 'members' ? '#1e88a8 !important' : '#f3f4f6 !important',
                                }
                            }}
                            startIcon={<PersonIcon />}
                        >
                            Members
                        </Button>
                    </Box>
                </Box>
            )}

            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ overflowX: 'auto' }}>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#f1f3f5' }}>
                                {view === 'requests' ? (
                                    <>
                                        <th style={thStyle}>Email</th>
                                        <th style={thStyle}>Designation</th>
                                        <th style={thStyle}>Department</th>
                                        <th style={thStyle}>Status</th>
                                        {userRole === 'admin' && <th style={thStyle}>Actions</th>}
                                    </>
                                ) : (
                                    <>
                                        <th style={thStyle}>Profile</th>
                                        <th style={thStyle}>Username</th>
                                        <th style={thStyle}>Email</th>
                                        <th style={thStyle}>Designation</th>
                                        <th style={thStyle}>Department</th>
                                        {userRole === 'admin' && <th style={thStyle}>Actions</th>}
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {(view === 'requests' ? requests : members).map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                    {view === 'requests' ? (
                                        <>
                                            <td style={tdStyle}>{item.user_email}</td>
                                            <td style={tdStyle}>{item.user_designation}</td>
                                            <td style={tdStyle}>{item.user_department}</td>
                                            <td style={tdStyle}>
                                                <span
                                                    style={{
                                                        backgroundColor: '#dee2e6',
                                                        borderRadius: '12px',
                                                        padding: '4px 10px',
                                                        fontSize: '12px',
                                                        color: '#333',
                                                    }}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            {userRole === 'admin' && (
                                                <td style={{ ...tdStyle, display: 'flex', gap: '10px' }}>
                                                    <Button variant="contained" size="small" color="success">
                                                        Accept
                                                    </Button>
                                                    <Button variant="outlined" size="small" color="error">
                                                        Reject
                                                    </Button>
                                                    {item.image && (
                                                        <Button
                                                            variant="text"
                                                            size="small"
                                                            onClick={() => window.open(item.image)}
                                                        >
                                                            View
                                                        </Button>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <td style={tdStyle}>
                                                <img
                                                    src={item.image}
                                                    alt="profile"
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                />
                                            </td>
                                            <td style={tdStyle}>{item.username}</td>
                                            <td style={tdStyle}>{item.email}</td>
                                            <td style={tdStyle}>{item.designation}</td>
                                            <td style={tdStyle}>{item.department}</td>
                                            {userRole === 'admin' && (
                                                <td style={{ ...tdStyle, display: 'flex', gap: '10px' }}>
                                                    <Button variant="contained" size="small">Promote</Button>
                                                </td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            )}
        </Box>
    );
}

const thStyle = {
    padding: '12px 16px',
    fontWeight: 'bold',
    color: '#444',
    fontSize: '14px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
};

const tdStyle = {
    padding: '10px 16px',
    fontSize: '14px',
    color: '#333',
};


export default MemberRequestComponent;
