import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

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
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#f0f0f0', // Set the background color you want
      },
    },
  },
});

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend using the api instance
    api.get('/leaderboard')
      .then(response => setLeaderboard(response.data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{minHeight: '100vh' }}>
        <Container>
        <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            style={{ marginBottom: '20px' }}
          >
            Home
          </Button>
          <Typography variant="h4" style={{ textAlign: 'center', marginTop: '40px', color: '#333' }}>
            Leaderboard
          </Typography>
         
          <Paper elevation={3} style={{ padding: '30px', marginTop: '20px', background: '#fff' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontSize:'large'}}>USERNAME</TableCell>
                    <TableCell style={{fontSize:'large'}}>SCORE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.username}</TableCell>
                      <TableCell>{entry.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Leaderboard;
