import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { Button, Typography, Input, Select, MenuItem, Paper, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../Images/logo.jpeg'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (!username || !password || !lang) {
      alert('Please fill in all fields');
      return;
    }

    api.post('/register', { username, password, lang })
      .then(response => {
        console.log('Registration successful:', response);
        navigate('/');
      })
      .catch(error => {
        console.error('Registration error:', error);
        if (error.response && error.response.status === 500) {
          alert('Error registering user. Please try again later.');
        } else {
          alert('Unexpected error. Please try again.');
        }
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
          <img src={Logo} alt="logo" style={{ width: '50%', marginBottom: '1rem' }} />
            <Typography variant="h6" style={{ margin: '1rem 0' }}>
              Create an Account
            </Typography>
            <div className='register'>
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
               <Select
                labelId="lang-label"
                id="lang"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                <MenuItem value="" disabled>
                  Select Language
                </MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Kannada">Kannada</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
              </Select>
              <Button onClick={handleClick} variant="contained" color="primary" fullWidth>
                Register
              </Button>
              <Typography variant="body2" style={{ margin: '1rem 0' }}>
                Already have an account? <Link to="/">Login here</Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
