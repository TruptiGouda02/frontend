import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import Logo from '../Images/logo.jpeg';
import { Button, Typography, Input, Select, MenuItem, Paper, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = () => {
    api.post('/login', { username, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate(`/quiz/:${username}`);
      })
      .catch(error => {
       
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3498db',
      },
      secondary: {
        main: '#2ecc71',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh', backgroundColor: '#ecf0f1' }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="logo">
              <img src={Logo} alt="logo" style={{ width: '50%' }} />
            </div>
            <Typography variant="body1" style={{ margin: '1rem 0' }}>
              Welcome to the Quiz-IQ App
            </Typography>
            <div className='login'>
              <h2>Login</h2>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ margin: '1rem 0' }}
                fullWidth
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '1rem 0' }}
                fullWidth
              />
              <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
                Login
              </Button>
              
              <Typography variant="body2" style={{ margin: '1rem 0' }}>
                Don't have an account? <Link to="/register">Register here</Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
