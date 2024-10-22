// src/Components/AppBarComponent.js

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weather Forecast
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
