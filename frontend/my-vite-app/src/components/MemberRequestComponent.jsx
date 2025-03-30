import React, { useEffect, useState, useCallback } from 'react';
import { GetAllSocietyRequests, GetAllUserRequests, AllMembersURL } from '../endPointUrls';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import RequestsTable from './RequestsTable';
import MembersTable from './MembersTable';
import getRoleORImageOREmailORId from '../getRole';

const MemberRequestComponent = () => {
    const [view, setView] = useState('requests');
    const [requests, setRequests] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = getRoleORImageOREmailORId(1);
    const user_id = getRoleORImageOREmailORId(4);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (userRole === 'admin') {
                const requests = await axios.get(`${GetAllSocietyRequests}${user_id}`);
                const members = await axios.get(`${AllMembersURL}${user_id}`);
                setRequests(requests.data);
                setMembers(members.data);
            } else {
                const requests = await axios.get(`${GetAllUserRequests}${user_id}`);
                setRequests(requests.data);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    }, [userRole, user_id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Box
            sx={{
                marginTop: '60px',
                padding: 3,
                paddingLeft: '90px',
                width: '100%',
                height: 'calc(100vh - 60px)',
                backgroundColor: '#f5f6fa',
                overflowY: 'auto',
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
                                },
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
                                },
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
            ) : view === 'requests' ? (
                <RequestsTable requests={requests} userRole={userRole} refreshData={fetchData} />
            ) : (
                <MembersTable members={members} userRole={userRole} />
            )}
        </Box>
    );
};

export default MemberRequestComponent;
