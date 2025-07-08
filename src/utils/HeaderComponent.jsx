import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.clear(); // Clear the localStorage (token, user info, etc.)
    navigate('/login');  // Redirect to login page
  };

  const userName = localStorage.getItem('role') === 'manager' ? 'Manager' : 'Engineer'; // Get user role

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1976d2',
        color: '#fff',
      }}
    >
      <Typography variant="h6">
        Welcome to the Management System, {userName}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default HeaderComponent;
