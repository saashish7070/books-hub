import React, { useEffect, useState } from 'react';
import StoreItem from './StoreItem';
import { Container, AppBar, Toolbar, Button, Typography, Grid, Box, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Bookstore = () => {
  const [container, setContainer] = useState([]);
  

   const fetchItems = async () =>{
        try{
            const data = await axios('http://localhost:5000/store/');
            setContainer(data.data)
        }catch(err){
            console.log(err.message);
        }
    }
    
    useEffect(()=>{
        fetchItems();
    },[])
  return (
    <div>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Bookstore
          </Typography>
          <Stack direction='row' sx={{ justifyContent: 'flex-end', marginTop: 2, marginBottom: 3, marginRight: 3 }}>
            <NavLink to='/shop/addStore'>
                <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Create +</Button>
            </NavLink>
            <Button variant="outlined" color="primary">Filter</Button>
          </Stack>
          <Box sx={{display:'flex', justifyContent: 'center',ml: 8}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 4, md: 6 }}>
                        {container.map(item=> <StoreItem item={item} key={item._id}/>)}
                </Grid>
            </Box>
      
    </div>
  );
};

export default Bookstore;


       
       