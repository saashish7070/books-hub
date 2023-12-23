import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Product from '../homepage/Product';

const Wishlist = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null); // Use null to indicate no specific item selected
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  let show = false;
  const PORT = process.env.REACT_APP_PORT;

  const handleRemoveWishlist = async (id) => {
    setItemToRemove(id);
    setConfirmationOpen(true);
  };

  const handleConfirmRemove = async () => {
    const userIdResponse = await axios.get(`${PORT}users/profile/${user.uid}`);
    const userId = userIdResponse.data._id;
    await axios.delete(`${PORT}users/wishlist/${userId}`, { data: { bookId: itemToRemove } });
    fetchData();
    setConfirmationOpen(false);
    setItemToRemove(null);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationOpen(false);
    setItemToRemove(null);
  };

  const fetchData = async () => {
    try {
      const userId = user.uid;
      const response = await axios.get(`${PORT}users/wishlist/${userId}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching wishlist data:', error);
      setLoading(false);
    }
  };

  const viewItemDetails = (id) => {
    setDetail(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const WishlistContainer = styled(Box)({
    display: 'flex',
    paddingTop: '60px',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '${(props) => props.theme.spacing(3)}px',
  });

  const EmptyWishlistMessage = styled(Typography)({
    margin: '${(props) => props.theme.spacing(2)}px',
  });

  const CellStyle = styled(TableRow)({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  });

  const ButtonStyle = styled(Button)({
    padding: '15px 50px',
  });

  if (!user) {
    return (
      <WishlistContainer>
        <Typography variant="h6" sx={{ margin: '200px' }}>
          Login to Add Items to Wishlist
        </Typography>
      </WishlistContainer>
    );
  }

  if (loading) {
    return (
      <WishlistContainer sx={{ height: '70vh', position: 'relative' }}>
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      {data && data.length > 0 ? (
        <>
          <Box>
            <Typography variant="h4" gutterBottom>
              Item Wishlist
            </Typography>
          </Box>
          <Box style={{ display: 'block' }}>
            <Paper style={{ margin: '40px 150px', padding: '5px' }}>
              <Table style={{ width: '100%', justifyContent: 'center' }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '550px' }}>
                      <b>Book Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Author</b>
                    </TableCell>
                    <TableCell>
                      <b>Price</b>
                    </TableCell>
                    <TableCell style={{ width: '50px' }}>
                      <b>Remove</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <CellStyle key={item._id} onClick={() => viewItemDetails(item._id)}>
                      <TableCell>
                        <b>{item && item.title}</b>
                      </TableCell>
                      <TableCell>{item && item.author}</TableCell>
                      <TableCell>Rs.{item && (item.newPrice || item.price)}</TableCell>
                      <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                        <DeleteIcon color="error" onClick={() => handleRemoveWishlist(item._id)} />
                      </TableCell>
                    </CellStyle>
                  ))}
                </TableBody>
              </Table>
              <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Typography variant="body1" color="error">
                  Your wishlist items will be saved for future reference.
                </Typography>
              </Box>

              {detail !== null && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid item key={detail}>
                    <Product item={data.find((item) => item._id === detail)} show={show} />
                  </Grid>
                </div>
              )}

              <Stack direction="row" sx={{ justifyContent: 'flex-end', marginTop: 2, marginBottom: 3 }}>
                <NavLink to="/" className="link">
                  <ButtonStyle
                    sx={{
                      minWidth: '150px',
                      marginRight: '25px',
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Back to Search
                  </ButtonStyle>
                </NavLink>
              </Stack>
            </Paper>
          </Box>
          {/* Confirmation Dialog */}
          <Dialog open={confirmationOpen} onClose={handleCloseConfirmationDialog}>
            <DialogTitle>Remove from Wishlist</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this item from your wishlist?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmationDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmRemove} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <WishlistContainer>
          <EmptyWishlistMessage variant="h6" style={{ padding: '100px 0 200px 0' }}>
            Your wishlist is empty.
          </EmptyWishlistMessage>
        </WishlistContainer>
      )}
    </WishlistContainer>
  );
};

export default Wishlist;
