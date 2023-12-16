import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../utils/api';

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

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = props.name.slice(1)
  useEffect(() => {
    // Fetch user profile data from the backend
    api.post('/userprofile', {  username })
      .then(response => setUserProfile(response.data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(username);
  const highestScore = userProfile.progress && userProfile.progress.length > 0
  ? userProfile.progress.reduce((maxScore, entry) => Math.max(maxScore, entry.score), 0)
  : 0;
  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginRight: '20px' }}>
        <Avatar alt="User Profile" src="/user-profile-logo.png" onClick={handleOpenModal} />
        
        {/* User Profile Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={isModalOpen}>
            <Paper style={{ padding: '30px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Typography variant="h5" style={{ marginBottom: '20px' }}>
                User Profile
              </Typography>
              <Typography variant="body1">
                Name: {userProfile.username}
              </Typography>
              <Typography variant="body1">
                Language: {userProfile.lang}
              </Typography>
              <Typography variant="body1">
                Proficiency: {userProfile.proficiency}
              </Typography>
              <Typography variant="body1">
                Latest Score: {userProfile.progress &&(userProfile.progress.length>0 &&  userProfile.progress[userProfile.progress.length-1].score )}
              </Typography>
              <Typography variant="body1">
                Highest Score: {highestScore}
              </Typography>
            </Paper>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default UserProfile;
