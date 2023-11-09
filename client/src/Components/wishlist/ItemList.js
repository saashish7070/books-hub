import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ItemList = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [dataFilter,setDataFilter] = useState([])
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState({
    subTotal: '0.0',
    delivery: '0.0',
    discount: '0.0',
    total: '0.0'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/itemList', {
          headers: {
            'Content-Type': 'application/json',
            'User-Data': JSON.stringify(user)
          }
        });
  
        // Use the original data for filtering
        setData(response.data);
        setLoading(false);
  
        // Filter items with the same ID and calculate their total quantity
        const filteredData = response.data.reduce((acc, item) => {
          const existingItem = acc.find((el) => el._id === item._id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            acc.push({ ...item, quantity: 1 });
          }
          return acc;
        }, []);
  
        // Use the filtered data for state update
        setDataFilter(filteredData);
  
        const calculateTotalAmount = () => {
          let totalAmount = 0;
          filteredData.forEach((item) => {
            totalAmount += item.price * item.quantity;
          });
          return totalAmount.toFixed(2);
        };
  
        // Update the totalAmount based on the filtered data
        setAmount((prevAmount) => ({
          ...prevAmount,
          totalAmount: calculateTotalAmount(),
        }));
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);
  
  const CartContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '${(props) => props.theme.spacing(3)}px',
  });

  const EmptyCartMessage = styled(Typography)({
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

  if (loading) {
    return (
      <Box sx={{ height: '70vh', position: 'relative' }}>
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      </Box>
    );
  }
  return (
    <CartContainer>
            <Box>
                <Typography variant="h4" gutterBottom>Item I Placed</Typography>
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
                      <b>Quantity</b>
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
                  {dataFilter.map((item) => {
                    return (
                      <CellStyle key={item._id}>
                        <TableCell>
                          <b>{item.title}</b>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
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
                <BoxStyle>
                  <Typo>Total Amount:</Typo>
                  <Typo>Rs.{amount.totalAmount}</Typo>
                </BoxStyle>
                {/* <BoxStyle>
                  <Typo>Delivery:</Typo>
                  <Typo>Rs.{amount.delivery}</Typo>
                </BoxStyle> */}
                {/* <BoxStyle>
                  <Typo>Discount:</Typo>
                  <Typo>Rs.{amount.discount}</Typo>
                </BoxStyle> */}
                {/* <BoxStyle>
                  <Typo>Total:</Typo>
                  <Typo>Rs.{amount.total}</Typo>
                </BoxStyle> */}
              </Box>
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
    </CartContainer>
  );
};

export default ItemList;

