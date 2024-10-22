import React, { useState } from 'react';
import { Switch, Typography } from '@mui/material';

const OfflineToggle = ({ onToggle }) => {
    const [isOffline, setIsOffline] = useState(false);

    const handleToggle = () => {
        const newState = !isOffline;
        setIsOffline(newState);
        onToggle(newState);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="body1" style={{ marginRight: '10px' }}>
                {isOffline ? 'Offline Mode' : 'Online Mode'}
            </Typography>
            <Switch checked={isOffline} onChange={handleToggle} />
        </div>
    );
};

export default OfflineToggle;
