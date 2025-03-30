import React from 'react';
import { Button } from '@mui/material';

const MembersTable = ({ members, userRole }) => {
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
                                <Button variant="contained" size="small">
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
