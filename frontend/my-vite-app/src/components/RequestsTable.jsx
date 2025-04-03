import { useState } from 'react';
import { Button } from '@mui/material';
import { AcceptMemberRequest, RejectMemberRequest } from '../endPointUrls';
import Loader from '../components/Loader';
import axios from 'axios';
import { deleteImage } from "../deleteImage";

const RequestsTable = ({ requests, userRole, refreshData }) => {

    const [isLoading, setLoading] = useState(false);

    const handleApproval = async (id) => {
        setLoading(true);
        try {
            await axios.put(`${AcceptMemberRequest}${id}`);
            alert('Request accepted successfully');
            refreshData();
        } catch (e) {
            console.error('Error accepting request:', e);
            alert('Failed to accept request');
        } finally {
            setLoading(false);
        }
    };

    const handleRejection = async (id, imageUrl) => {
        setLoading(true);
        try {
            await axios.delete(`${RejectMemberRequest}${id}`);
            if (imageUrl) {
                let delimgpath = imageUrl.split('/').pop();
                await deleteImage(delimgpath);
            }
            alert('Request rejected successfully');
            refreshData();
        } catch (e) {
            console.error('Error rejecting request:', e);
            alert('Failed to reject request');
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            {userRole !== 'admin' && (
                <h2 style={{ marginBottom: '20px', color: '#444', fontSize: '18px' }}>My Requests</h2>
            )}
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
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Designation</th>
                        <th style={thStyle}>Department</th>
                        <th style={thStyle}>Society Name</th>
                        <th style={thStyle}>Status</th>
                        {userRole === 'admin' && <th style={thStyle}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((item, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                            <td style={tdStyle}>{item.user_email}</td>
                            <td style={tdStyle}>{item.user_designation}</td>
                            <td style={tdStyle}>{item.user_department}</td>
                            <td style={tdStyle}>{item.society_name}</td>
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
                                    <Button variant="contained" size="small" color="success"
                                        style={{ backgroundColor: 'rgb(48, 167, 201)', color: '#333' }}
                                        onClick={() => handleApproval(item.id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleRejection(item.id, item.image)}
                                        color='white'
                                    >
                                        Reject
                                    </Button>
                                    {item.image && (
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() => window.open(item.image)}
                                            style={{ backgroundColor: 'rgb(48, 167, 201)', color: '#333' }}
                                        >
                                            View
                                        </Button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

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

export default RequestsTable;
