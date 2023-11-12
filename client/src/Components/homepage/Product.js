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
  Paper,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';



const FormContainer = styled('form')({
  marginRight: '10px',
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between' 
});

const Product = ({ item }) => {
  const { user } = UserAuth();
  // const [newPrice, setNewPrice] = useState('');
  const [comment,setComment] = useState('')
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataResponse, setDataResponse] = useState('');
  const [seller,setSeller] = useState('')
  const [facebookId,setFacebookId] = useState('')
  const PORT = process.env.REACT_APP_PORT;
  const [showMore, setShowMore] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState('');


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const userId = user?.uid;
  
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
  
  
  function modifyFacebookURL(url) {
    // Check if the URL contains "www.facebook.com/"
    if (url.includes('www.facebook.com/')) {
      // Insert "/messages/t/" after "www.facebook.com/"
      const modifiedURL = url.replace('www.facebook.com/', 'www.facebook.com/messages/t/');
  
      // Check if the modified URL contains "/profile.php?id="
      if (modifiedURL.includes('/profile.php?id=')) {
        // Replace "/profile.php?id=" with "/messages/t/"
        return modifiedURL.replace('/profile.php?id=', '/');
      } else {
        // If not, return the modified URL
        return modifiedURL;
      }
    } else {
      // If "www.facebook.com/" is not present, return the original URL
      return url;
    }
  }

  
  const handleClick = async(id) => {
    const response = await axios.get(`${PORT}books/${id}`)
    // console.log(response.data.sellerId)
    const userResponse = await axios.get(`${PORT}users/${response.data.sellerId}`)
    if(userResponse.data.facebookId){
      setFacebookId(modifyFacebookURL(userResponse.data.facebookId))
    }
    setSeller(userResponse.data)
    setShowDetailPopup(!showDetailPopup);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const getDescriptionToShow = () => {
    if (showMore) {
      return item.description;
    } else {
      const characters = item.description.split('');
      const periodIndex = characters.findIndex(char => char === '.');
      
      if (periodIndex !== -1) {
        setShowMore(true);
        return characters.slice(0, periodIndex + 1).join('');
      }
  
      return item.description;
    }
  };
  
  
  useEffect(() => {
    const truncatedText = getDescriptionToShow();
    setTruncatedDescription(truncatedText);
  }, [showDetailPopup, item, getDescriptionToShow]);
  

  return (
    <>
      {item.soldOut ? null : (
        <>
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {dataResponse}
            </Alert>
          </Snackbar>
          <Card sx={{marginRight: '10px'}}>
          <Grid item sx={{ width: '290px',marginTop: '15px'}} onClick={() => handleClick(item._id)}>
            <Box>
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
        {/* {item.available === 'sold-out' && (
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
                  </Button> */}
                {/* </Stack>
                
              )} */}
                <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={handleOnClick}>
                  Add To Wishlist
                </Button>
                <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={() => handleClick(item._id)}>
                  See Detail
                </Button>
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
                  maxWidth: '800px',
                  bgcolor: 'background.paper',
                  borderRadius: 10,
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  p: 4,
                }}
              >
                <h4 id="modal-title" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Book Detail
                </h4>
                <Box sx={{ display: 'flex' }}>
                  <img src={item.bookPicture} height="300" width="40%" alt="Image is here" />
                  <Box sx={{ display: 'block', padding: '20px', width: '60%'}}>
                   <h2 id="modal-title" sx={{ fontWeight: 'bold', mb: 2 ,color : '#C7DFF7',mt: 0, padding: 'none'}}>
                     {item.title}
                    </h2>

                    <Paper
                      elevation={3}
                      sx={{
                        padding: '16px',
                        width: '100%',
                        backgroundColor: '#F4F4F4',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant="subtitle1">
                        <b>Author</b>: {item.author}
                      </Typography>
                      <Typography variant="subtitle1">
                        <b>Publisher</b>: {item.publisher}
                      </Typography>
                      <Typography variant="subtitle1">
                        <b>Price</b>: {item.newPrice}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Description
                      </Typography>
                      <Typography>
                        {showMore ? <>{item.description}</>: <>{truncatedDescription}</>}
                      </Typography>
                      {truncatedDescription !== item.description && (
                        <Button onClick={toggleShowMore} color="primary">
                          {showMore ? 'Show Less' : 'Show More'}
                        </Button>
                      )}



                    </Paper>
                    <br />
                    {/* <Typography>{item}</Typography> */}
                    <hr />
                    <h4 id="modal-title" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Seller Detail
                    </h4>
                    <Typography>Name: {seller.name}</Typography>
                    <Typography>Email: {seller.email}</Typography>
                    <Typography>Contact no: {seller.contact ? <>{seller.contact}</>:<>Not Mentioned</>}</Typography>
                    <Typography>Address: {seller.userAddress ?  <>{seller.userAddress.city},{seller.userAddress.province}</>: <>Not Mentioned</>}</Typography>
                    
                      {facebookId && <Typography style={{ display: 'flex'}}>Connect with Facebook<a href={`${facebookId}`} target="_blank" rel="noopener noreferrer" style={{alignItems: 'center'}}><FacebookOutlinedIcon color='primary' sx={{ ml: 2 }} /></a></Typography>}
                 
                  </Box>
                </Box>
                
               

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={handleOnClick}>
                    Add To Wishlist
                  </Button>
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
