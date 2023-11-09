import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, CircularProgress, Input, ThemeProvider, createTheme, MenuItem } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { UserAuth } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';


const FormContainer = styled('form')({
  width: '100%',
  margin: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const AddStore = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [ownerId,setOwnerId] = useState('');
  const [storePictures, setStorePictures] = useState([]);
  const [loading,setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [range, setRange] = useState('');

  
  const navigate = useNavigate();
  const {user} = UserAuth();

  useEffect(()=>{
    if(user){
        axios
      .get('http://localhost:5000/users')
      .then(response=>{
        setOwnerId(response.data.filter((user)=>user.email===user.email)[0]._id)
      })
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isError) {
      return;
    }
    setLoading(true);
    const newStore = {
      storeName,
      ownerId,
      location,
      about,
      contact,
      websiteUrl,
      storePicture: storePictures.base64, // extract base64 string from StorePicture object
    };
    axios
      .post('http://localhost:5000/store/addNew', newStore)
      .then((response) => {
        console.log("Store was created successfully")
        setLoading(false);
        setStoreName('');
        setLocation('');
        setContact('');
        setAbout('');
        setWebsiteUrl('');
        setStorePictures([]);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    navigate('/');
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setStorePictures({ ...storePictures, base64 });
  };

  
  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleAboutChange = (event) => {
    const input = event.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= 250) {
      setAbout(input);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            cursor: 'pointer',
            fontWeight: 'bold',
            borderLeft: '3px solid #FFC107',
            paddingLeft: '10px',
            marginBottom: '20px',
            '&::after': {
              content: '"ADD NEW SHOP"',
              animation: 'typing 5s steps(30), blink-caret 1s step-end infinite',
            },
          }}
        >
        </Typography>

        <TextField
          required
          label="Store Name"
          value={storeName}
          onChange={(event) => setStoreName(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        <TextField
          required
          label="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        
        <TextField
            required
            select
            label="Valley Inside or Outside"
            value={range}
            onChange={handleRangeChange}
            sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          >
          <MenuItem value={null}>Select an option</MenuItem>
          <MenuItem value="Inside">Inside Valley</MenuItem>
          <MenuItem value="Outside Valley">Outside Valley</MenuItem>
        </TextField>
        
        <TextField
          required
          label="Contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        <TextField
          label="Website URL"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        <TextField
          label='About'
          value={about}
          multiline
          onChange={handleAboutChange}
          error={isError}
          helperText={isError && 'Word limit exceeded (250 words maximum)'}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        <Typography>
          Store Picture
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'red' }}>
          You must select at least one picture of Store
        </Typography>
        <input
          type="file"
          onChange={handleFileInputChange}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          accept="image/jpeg, image/png"
        />
        <input
          type="file"
          onChange={handleFileInputChange}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          accept="image/jpeg, image/png"
        />
        <input
          type="file"
          onChange={handleFileInputChange}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          accept="image/jpeg, image/png"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', marginTop: '20px' }}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </FormContainer>
    </ThemeProvider>
  );
};

export default AddStore;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  });
}
