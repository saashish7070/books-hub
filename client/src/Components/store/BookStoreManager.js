import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';

// Import the SellMyItem component
import SellMyItem from '../sellItem/SellMyItem';
import axios from 'axios';

const BookStoreManager = () => {
  const { id: storeId } = useParams();
  
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleRemoveBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all books from the Store model
        axios.get('http://localhost:5000/books')
        .then((response) => {
          const bookData = response.data
          setBooks(bookData.map((book) => {
            if (book.bookStore === storeId) {
              return book;
            }
            return null;
          }).filter(Boolean));
            
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [storeId]);

  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Store Manager
      </Typography>

      {/* Render the SellMyItem component */}

      <Box sx={{ my: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Manage Books
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleRemoveBook(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <SellMyItem handleAddBook={handleAddBook} storeId={storeId} />
    </Box>
  );
};

export default BookStoreManager;
