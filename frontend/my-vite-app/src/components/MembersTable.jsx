import React, { useState } from 'react';
import { Button } from '@mui/material';
import { PromoteMemberURL } from '../endPointUrls';
import axios from 'axios';

const MembersTable = ({ members, userRole }) => {
    const [disabledButtons, setDisabledButtons] = useState({});

    if (!members || members.length === 0) {
        return <p>No Members at the moment</p>
    }

    const handleSubmit = async (id) => {
        const response = await axios.put(`${PromoteMemberURL}${id}`);
        if (response) {
            alert('Member promoted successfully');
            setDisabledButtons((prev) => ({ ...prev, [id]: true }));
        } else {
            alert('Failed to promote member');
        }
    };

    return (
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
                    <th style={thStyle}>Profile</th>
                    <th style={thStyle}>Username</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Designation</th>
                    <th style={thStyle}>Department</th>
                    {userRole === 'admin' && <th style={thStyle}>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {members.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
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
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{
                                        backgroundColor: disabledButtons[item.id] ? '#b0bec5' : '#30A7C9',
                                        color: '#fff',
                                    }}
                                    onClick={() => handleSubmit(item.id)}
                                    disabled={disabledButtons[item.id]}
                                >
                                    Promote
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
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

export default MembersTable;
