import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, CircularProgress, Input, ThemeProvider, createTheme, MenuItem } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { UserAuth } from '../../firebase/auth';

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

const AddBookForm = ({ storeId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bookPicture, setBookPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState('');
  const [status, setStatus] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const { user } = UserAuth();
  const PORT = process.env.REACT_APP_PORT;

  const handleRangeChange = (event) => {
    setStatus(event.target.value);
    setNewPrice('');
  };

  useEffect(() => {
    if (user) {
      axios.get(`${PORT}users`).then((response) => {
        setSeller(response.data.filter((user) => user.email === user.email)[0]._id);
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newBook = {
      title,
      author,
      description,
      price,
      status,
      sellerId: seller,
      bookStore: storeId,
      bookPicture: bookPicture.base64,
      newPrice: parseInt(newPrice),
    };
    axios
      .post('http://localhost:5000/books/create', newBook)
      .then((response) => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setPrice('');
        setBookPicture(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    if (storeId) {
      axios
        .get('http://localhost:5000/books')
        .then((booksResponse) => {
          const books = booksResponse.data;
          const storeBooks = books.filter((book) => book.bookStore === storeId);
          const bookIds = storeBooks.map((book) => book._id);
          axios
            .post(`http://localhost:5000/store/storeBooks/${storeId}`, { bookIds })
            .then(() => {
              console.log(`Book is added`);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setBookPicture({ ...bookPicture, base64 });
  };

  return (
    <ThemeProvider theme={theme}>
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
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          multiline
          rows={4}
        />
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
          <MenuItem value={null}>Select an option</MenuItem>
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

        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', marginTop: '20px' }}>
          {loading ? <CircularProgress size={24} /> : 'Sell'}
        </Button>
      </FormContainer>
    </ThemeProvider>
  );
};

export default AddBookForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
