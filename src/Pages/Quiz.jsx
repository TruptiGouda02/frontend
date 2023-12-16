import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const maxQuestions = 10;
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.post('/questions',{ username: String(username.slice(1))})
      .then(response => setQuestions(response.data.slice(0, maxQuestions)))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    const currentQues = questions[currentQuestion];

    if (selectedOption === currentQues.answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);

    // Adjust difficulty based on user's performance
    if (currentQuestion < 3 && score >= currentQuestion + 1) {
      setDifficulty((prevDifficulty) => prevDifficulty + 1);
    }

    setSelectedOption('');
  };

  const handleFinishQuiz = () => {
    api.post('/finish', {
      username: String(username.slice(1)),
      score: Number(score),
    })
      .then(response => {
        console.log(response);
        navigate('/leaderboard');
      })
      .catch(error => {
        console.error('Error storing score:', error.message);
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

  const renderQuiz = () => {
    if (questions.length === 0) {
      return <Typography variant="h6">Loading questions...</Typography>;
    }

    if (currentQuestion >= maxQuestions) {
      return (
        <div>
          <Typography variant="h6">
            Quiz completed! Your score: {score} / {maxQuestions}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinishQuiz}
            style={{ marginTop: '20px' }}
          >
            Finish and View Leaderboard
          </Button>
        </div>
      );
    }

    const currentQues = questions[currentQuestion];

    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" style={{ marginBottom: '10px' }}>
          Question {currentQuestion + 1} 
        </Typography>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          {currentQues.question}
        </Typography>
        <RadioGroup
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {currentQues.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              style={{ margin: '10px 0' }}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          style={{ marginTop: '20px' }}
        >
          {currentQuestion === maxQuestions - 1 ? 'Finish' : 'Next Question'}
        </Button>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" style={{ color: '#3498db' }}>
            Learn Language by Solving Quiz
          </Typography>
          <UserProfile name={username}/>
        </div>
        <Paper elevation={3} style={{ padding: '30px', marginTop: '20px' }}>
          {renderQuiz()}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Quiz;
