import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on new attempt

    try {
      // API call to authenticate user
      const response = await axios.post('http://20.197.34.224:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
         localStorage.setItem('userID', response.data.user.id);
        // Redirect to respective dashboard based on user role
        if (response.data.user.role === 'manager') {
          navigate('/manager/dashboard');
        } else {
          navigate('/engineer/dashboard');
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Grid container sx={{ height: '80vh',display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center',mt:5 }}>
      <Grid size={{xs:12,sm:8,md:5}}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Welcome Back
        </Typography>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Error Message */}
          {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, marginTop: 2 }}
          >
            Log In
          </Button>

          {/* Forgot Password Link */}
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
