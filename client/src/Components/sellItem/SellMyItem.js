import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, CircularProgress, Input, ThemeProvider, createTheme, MenuItem, LinearProgress, Snackbar, Alert} from '@mui/material';
import axios from 'axios';
import { UserAuth, storeImage} from '../../firebase/auth';
import { styled } from '@mui/system';

const FormContainer = styled('form')({
  width: '100%',
  margin: '40px',
  paddingTop: '70px',
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

let categoriesItem = ["Novel","Engineering Books","MBBS Books","others"]

const SellMyItem = ({ storeId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [categories,setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [bookPicture, setBookPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState('');
  const [status, setStatus] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [uploadProgress] = useState(0);
  const [placed, setPlaced] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = UserAuth();
  const PORT = process.env.REACT_APP_PORT;

  const handleRangeChange = (event) => {
    setStatus(event.target.value);
    setNewPrice('');
  };

  useEffect(() => {
    if (user) {
      axios.get(`${PORT}users`).then((response) => {
        setSeller(response.data.filter((users) => user.email === users.email)[0]._id);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const currentUser = user
      const sellerId = await axios.get(`${PORT}users`)
        .then((response) => {
          const user = response.data.find((user) => user.uid === currentUser.uid);
           return user ? user._id : null;
        })
        .catch((error) => {
          console.error(error);
          return null;
        });

      if (!sellerId) {
        console.error("Unable to determine the seller ID");
        setLoading(false);
        return;
      }
      if (bookPicture) {
        const pictureUrl = await storeImage(sellerId, bookPicture, setUploadProgress);

        const newBook = {
          title,
          author,
          description,
          categories,
          price,
          status,
          sellerId: seller,
          bookStore: storeId,
          bookPicture: pictureUrl, 
          newPrice: parseInt(newPrice),
        };
        const response = await axios.post(`${PORT}books/create`, newBook);
        setTitle('');
        setAuthor('');
        setDescription('');
        setCategories('');
        setPrice('');
        setBookPicture(null);
        setLoading(false);

        const userBook = {
          sellerId,
          book: response.data._id
        }
        
        const userData = await axios.post(`${PORT}users/itemList`,userBook)
        setPlaced(userData.data.message)

        if (storeId) {
          axios
            .get(`${PORT}books`)
            .then((booksResponse) => {
              const books = booksResponse.data;
              const storeBooks = books.filter((book) => book.bookStore === storeId);
              const bookIds = storeBooks.map((book) => book._id);
              axios
                .post(`${PORT}store/storeBooks/${storeId}`, { bookIds })
                .then(() => {
                  console.log(`Book is added`);
                })
                .catch((error) => {
                  console.error(error);
                  setLoading(false);
                });
            })
        }
        
        setOpenSnackbar(true);
      }
    }catch{
      console.log("Error")
    }
  }

  const maxCharacters = 120; // Set your desired character limit

  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setDescription(inputValue);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setBookPicture(file);
  };

  const setUploadProgress = (progress) => {
    // Handle progress updates here
    console.log(`Upload Progress: ${progress}%`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <ThemeProvider theme={theme}>
       <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {placed}
            </Alert>
        </Snackbar>
      <FormContainer onSubmit={handleSubmit}>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', borderBottom: '3px solid #3f51b5', paddingBottom: '10px', marginBottom: '20px' }}>
          Sell Book
        </Typography>

        <TextField
          required
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
        <TextField
          required
          label="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />
       <TextField
          required
          select
          label="Select Category"
          value={categories}
          onChange={(event) => setCategories(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        >
          {categoriesItem.map((categoryItem) => (
            <MenuItem key={categoryItem} value={categoryItem}>
              {categoryItem}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          sx={{ marginBottom: '10px', width: '100%', maxWidth: '400px' }}
          multiline
          rows={3}
        />
        {showWarning && (
          <Typography variant="caption" color="error">
            Maximum character limit reached ({maxCharacters} characters).
          </Typography>
        )}
        <TextField
          required
          label="Original Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          type="number"
        />

        <TextField
          required
          select
          label="Status of Item"
          value={status}
          onChange={handleRangeChange}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Second Hand">Second Hand</MenuItem>
        </TextField>

        {status === 'Second Hand' && (
          <TextField
            required
            label="New Price (40-60% of Original Price)"
            value={newPrice}
            onChange={(event) => setNewPrice(event.target.value)}
            sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
            type="number"
            inputProps={{
              min: Math.floor(price * 0.4), // Minimum value is 40% of the original price
              max: Math.floor(price * 0.6), // Maximum value is 60% of the original price
              step: 1, // Allow integer values only
            }}
          />
        )}

        <Input type="file" onChange={handleFileInputChange} sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }} />
        <LinearProgress variant="determinate" value={uploadProgress} sx={{ width: '100%', marginBottom: '20px' }} />
       
        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', marginTop: '20px' }}>
          {loading ? <CircularProgress size={24} /> : 'Sell'}
        </Button>
      </FormContainer>
    </ThemeProvider>
  );
}

export default SellMyItem;
