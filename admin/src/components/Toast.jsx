import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const Toast = ({ open, onClose, message, severity }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    TransitionComponent={SlideTransition}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: '100%',
        backgroundColor: severity === 'success' ? '#4caf50' : severity === 'error' ? '#f44336' : severity === 'warning' ? '#ff9800' : '#2196f3',
        color: '#fff',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        fontWeight: 'bold',
        animation: 'pulse 1.5s infinite',
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;