import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Wishlist = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const PORT = process.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${PORT}users/wishlist`, {
          headers: {
            'Content-Type': 'application/json',
            'User-Data': JSON.stringify(user)
          }
        });

        setData(response.data);
        setLoading(false);

      } catch (error) {
        console.log('Error fetching wishlist data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const WishlistContainer = styled(Box)({
    display: 'flex',
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

  const BoxStyle = styled(Box)({
    margin: '10px 10px',
    width: '250px',
    padding: '20px 25px',
    border: '1px solid #2196f3',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  });

  const Typo = styled(Typography)({
    fontWeight: '600',
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
      <WishlistContainer sx={{height: '70vh',position: 'relative'}}>
        <CircularProgress sx={{position:'absolute', top:'50%',left:'50%'}}/>
      </WishlistContainer>
    );
  }

  if (data.length === 0) {
    return (
      <WishlistContainer>
        <EmptyWishlistMessage variant="h6" style={{ margin: '200px' }}>
          Your wishlist is empty.
        </EmptyWishlistMessage>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
       <Box>
          <Typography variant="h4" gutterBottom>Item Wishlist</Typography>
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
              {data.map((item) => {
                return (
                  <CellStyle key={item._id}>
                    <TableCell>
                      <b>{item.title}</b>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>Rs.{item.price}</TableCell>
                    <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                      <DeleteIcon color='error'/>
                    </TableCell>
                  </CellStyle>
                );
              })}
            </TableBody>
          </Table>
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Typography variant="body1" color="error">
              Your wishlist items will be saved for future reference.
            </Typography>
          </Box>
          <Box style={{ width: '700%', display: 'flex', marginLeft: 100, justifyContent: 'flex-start' }}>
            <Typography style={{ fontSize: '13px' }}>
              If you have a promotion code, please enter it here:
            </Typography>
          </Box>
          <Stack direction="row" sx={{ marginTop: '10px', justifyContent: 'space-evenly' }}>
            <TextField variant="outlined" label="Promo Code" placeholder="Please enter promo code here" sx={{ width: '400px' }} />
            <ButtonStyle
              sx={{
                minWidth: '150px',
                backgroundColor: '#2196f3',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#0d6fe3',
                },
              }}
              variant="contained"
            >
              Apply Discount
            </ButtonStyle>
            
          </Stack>
          <Stack direction="row" sx={{ justifyContent: 'flex-end', marginTop: 2, marginBottom: 3 }}>
            <NavLink to='/' className='link'>
              <ButtonStyle
                sx={{
                  minWidth: '150px',
                  marginRight: '25px',
                }}
                color="primary"
                variant="contained"
              >
                Continue Shopping
              </ButtonStyle>
            </NavLink>
          </Stack>
        </Paper>
      </Box>
    </WishlistContainer>
  );
};

export default Wishlist;
