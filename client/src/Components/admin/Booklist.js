import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Modal, TextField, Button } from '@mui/material';
import { TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody } from '@mui/material';
// import BookIcon from '@mui/icons-material/Book';

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateBooksId,setUpdateBooksId] = useState(null);
  const [updateBook,setUpdateBook] = useState([]);
  const [bookTitleCount, setBookTitleCount] = useState({});
  const[showUpdatePopup,setShowUpdatePopup] = useState(false);
  const [deleteBooks, setDeleteBooks] = useState(false); // new state variable

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [deleteBooks]); 

  useEffect(() => {
    const titleCount = books.reduce((acc, book) => {
      acc[book.title] = (acc[book.title] || 0) + 1;
      return acc;
    }, {});
    setBookTitleCount(titleCount);
  }, [books]);
 
  const handleDelete= (id)=>{
    let tiTle
    books.map(book=>{
      if(id === book.id){
        tiTle = book.title;
      }
    })
    axios.delete(`http://localhost:5000/books/${id}/delete`)
      .then(response => {
        setDeleteBooks(!deleteBooks); // set the state variable to trigger a re-render
      })
      .catch(error => {
        console.log(error);
      });
      books.map(book=>{
        if(book.title !== tiTle){
          setSelectedBook(null)
        }
      })
  }

  const handleUpdate = (id) =>{
    // setUpdateBooksId(!updateBooks)
    setShowUpdatePopup(!showUpdatePopup)
    setUpdateBooksId(id)
  }

  const handleUpdateData=()=>{
    books.map(book=>{
      console.log(updateBooksId)
      if(book._id === updateBooksId){
        book.title = (!updateBook.title)?book.title:updateBook.title;
        book.author = updateBook.author;
        book.price = updateBook.price;
        axios.post(`http://localhost:5000/books/${selectedBook._id}/update`, {
        title: book.title,
        author: book.author,
        price: book.price,}).then((response)=>{
          console.log(response)
        }).catch(err=>{
          console.error(err);
        })
    }})
    
  }
  const handleUpdateBookChange = (field, value) => {
    setUpdateBook(prevBook => ({ ...prevBook, [field]: value }));
  };

  const handleListItemClick = (event, book) => {
    setSelectedBook(book);
  };
  const filteredBooks = books.filter((book, index, self) =>
    index === self.findIndex(b => b.title === book.title)
  );

  return (
    <Box sx={{
        width: '100%',
        maxWidth: '600px',
        bgcolor: 'background.paper',
        borderRadius: 10,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <List component="nav" aria-label="book list">
          {filteredBooks.map(book => (
            <ListItemButton
              key={book._id}
              onClick={(event) => handleListItemClick(event, book)}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
                ...(selectedBook?._id === book._id && {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                })
              }}
            >
              <ListItemIcon>
                {/* <BookIcon /> */}
              </ListItemIcon>
              <ListItemText primary={getBookTitleWithCount(bookTitleCount, book)} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ margin: '10px 0' }} />
        {selectedBook && (
          <Box sx={{ padding: '10px' }}>
            <h2 sx={{ fontWeight: 'bold' }}>{selectedBook.title}</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Book ID</TableCell>
                    {/* <TableCell>Title</TableCell> */}
                    <TableCell>Author</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.filter(book => book.title === selectedBook.title)
                    .map(book => (
                      <TableRow key={book.id}>
                        <TableCell>{book._id}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        {/* <TableCell>{book.title}</TableCell> */}
                        <TableCell>{book.price}</TableCell>
                        <TableCell sx={{display:'flex'}}>
                        <ListItemButton
                          sx={{
                            bgcolor: '#2196f3',
                            color: '#fff',
                            borderRadius: '5px 0px 0px 5px',
                            '&:hover': {
                              bgcolor: '#1976d2',
                            },
                          }}
                          onClick={() => handleUpdate(book._id)}
                        >
                          Update
                        </ListItemButton>

                        <ListItemButton sx={{
                            bgcolor: '#f44336',
                            color: '#fff',
                            borderRadius: '0px 5px 5px 0px',
                            '&:hover': {
                              bgcolor: '#d32f2f',
                            },
                          }}
                          onClick={() => handleDelete(book._id)}>
                            Delete
                          </ListItemButton>
                      </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {/* <Divider sx={{ margin: '10px 0' }} /> */}
        {showUpdatePopup && (
        <Modal
          open={showUpdatePopup}
          onClose={() => setShowUpdatePopup(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              borderRadius: 10,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              p: 4,
            }}>
          <h2 id="modal-title" sx={{ fontWeight: 'bold', mb: 2 }}>Update Book</h2>
          <TextField
          fullWidth
          label="Title"
          value={updateBook.title}
          onChange={(event) => handleUpdateBookChange('title', event.target.value)}
          sx={{ mb: 2 }}
          />
          <TextField
          fullWidth
          label="Author"
          value={updateBook.author}
          onChange={(event) => handleUpdateBookChange('author', event.target.value)}
          sx={{ mb: 2 }}
          />
          <TextField
          fullWidth 
          label="Price"
          value={updateBook.price}
          onChange={(event) => handleUpdateBookChange('price', event.target.value)}
          sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => setShowUpdatePopup(false)} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateData} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>Update</Button>
          </Box>
          </Box>
          </Modal>
          )}
      </Box>
  );
}

function getBookTitleWithCount(bookTitleCount, book) {
  const count = bookTitleCount[book.title];
  if (count > 1) {
    return `${book.title} (${count})`;
  }
  return book.title;
}

export default BookList
