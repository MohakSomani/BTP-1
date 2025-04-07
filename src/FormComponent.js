import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#1e1e1e',  // Unified background color
      paper: '#2d2d2d',    // Slightly darker for form contrast
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '1.5px'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4d4d4d',
            },
          },
        },
      },
    },
  },
});

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    literacyLevel: '',
    pastExperience: '',
    interests: '',
    skills: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/submit', formData);
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        literacyLevel: '',
        pastExperience: '',
        interests: '',
        skills: ''
      });
    } catch (error) {
      alert('Error submitting form');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Enables global dark background */}
      <Container 
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
            transform: 'translateY(-5%)'
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: 'primary.main',
              mb: 4,
              textTransform: 'uppercase'
            }}
          >
            Jobs4Every1
          </Typography>

          {/* Rest of the form remains the same */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              select
              fullWidth
              label="Literacy Level"
              name="literacyLevel"
              value={formData.literacyLevel}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            >
              <MenuItem value="">
                <em>Select Literacy Level</em>
              </MenuItem>
              <MenuItem value="basic">Basic Reading/Writing</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Past Experience"
              name="pastExperience"
              value={formData.pastExperience}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                transition: '0.3s',
                fontSize: '1.1rem'
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormComponent;