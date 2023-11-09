import styled from '@emotion/styled';
import {
  Box,
  Button,
  Grid,
  Modal,
  Rating,
  MuiAlert,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';

const Product = ({ item }) => {
  const { user } = UserAuth();
  const [newPrice, setNewPrice] = useState('');
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataResponse, setDataResponse] = useState('');
  const PORT = process.env.REACT_APP_PORT;

  const Content = styled(Typography)({
    fontFamily: 'Arial',
    fontSize: '14px',
    fontWeight: 520,
  });

  const handleOnClick = () => {
    // if (item.booked) {
      //   return; // If the book is already booked or sold, do nothing
      // }

      axios
      .post(`${PORT}users/addToWishlist`, { bookId: item._id, user })
      .then((response) => {
        setDataResponse(response.data.message);
        console.log(response);
        setOpenSnackbar(true);
        // Add any additional logic or state updates here if needed
      })
      .catch((error) => {
        console.error('Failed to update user cart:', error);
      });
  };

  const handleClick = () => {
    setShowDetailPopup(!showDetailPopup);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {item.soldOut ? null : (
        <>
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {dataResponse}
            </Alert>
          </Snackbar>
          <Card>
          <Grid item sx={{ width: '290px',marginTop: '15px'}}>
            <Box onClick={() => handleClick(item._id)}>
              <img src={item.bookPicture} height="250" width="60%" alt="Image is here" />
            </Box>
            <Typography variant="h5" color="success" sx={{ mt: '10px' }}>
              {item.title}
            </Typography>
            <Box
              sx={{
                border: '1px solid #ccc',
                padding: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
        {item.categories ? (
          <>
            <Typography variant="body2">{item.categories}</Typography>
            <Box
              sx={{
                borderLeft: '1px solid #ffffff',
                height: '15px',
                margin: '0 2px',
              }}
            />
          </>
        ) : (
          <Typography variant="body2">Not Mentioned</Typography>
        )}

  {item.status === 'Second Hand' && (
    <>
      <Box
        sx={{
          borderLeft: '1px solid #ccc',
          height: '15px',
          margin: '0 5px',
        }}
      />
      <Typography variant="body2" color="error">
        Second Hand Item
      </Typography>
    </>
  )}

  {item.status !== 'Second Hand' && (
    <>
      <Box
        sx={{
          borderLeft: '1px solid #ccc',
          height: '15px',
          margin: '0 5px',
        }}
      />
      <Typography variant="body2" color="primary">
        New Item
      </Typography>
        </>
      )}
    </Box>
    <Stack direction="column" sx={{ justifyContent: 'space-between', mr: 3, ml: 3, mt: 1 }}>
        <Content>Author: {item.author}</Content>
        <Content>
        {item.status === 'Second Hand' && (
        <>
           <Typography variant="body1">New Price</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through', display: 'inline-block' }}>
             Rs. {item.price}
          </Typography>
          <Typography variant="body1" color="error" sx={{ display: 'inline-block', ml: 1 }}>
            Rs. {item.newPrice}
          </Typography>
        </>
          )}
          {item.status !== 'Second Hand' && (
          <Typography variant="body1">Original Price: Rs. {item.price}</Typography>
                )}
        </Content>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: 'center', m: 2 }}>
        {item.available === 'sold-out' && (
          <Button variant="outlined" color="error" sx={{ fontSize: '12px' }}>
            Stock Empty
          </Button>
        )}
        {item.available !== 'sold-out' && (
          <Stack direction="row" sx={{justifyContent: 'center'}}>
            <span
              style={{
                border: '1px solid #2e7d32', // Add your border style
                padding: '5px 10px', // Add your padding
                fontSize: '10px', 
                fontFamily: "Arial",
                fontWeight: 800,
                color: '#2e7d32',
                marginRight: '2px',
                borderRadius: '5px'
                // Add your font size
                // Add any other styles you need
              }}
            >
              Stock Available
                  </span>
                  <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={handleOnClick}>
                    Add To Wishlist
                  </Button>
                </Stack>
                
              )}
                
            </Stack>
          </Grid>
          </Card>
          {showDetailPopup && (
            <Modal
              open={showDetailPopup}
              onClose={() => setShowDetailPopup(false)}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
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
                }}
              >
                <h2 id="modal-title" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Book Detail
                </h2>
                <Box sx={{ display: 'flex' }}>
                  <img src={item.bookPicture} height="170" width="40%" alt="Image is here" />
                  <Box sx={{ display: 'block', padding: '30px' }}>
                    <Typography>{item.description}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={() => setShowDetailPopup(false)} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default Product;
