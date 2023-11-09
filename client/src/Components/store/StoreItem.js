import styled from '@emotion/styled';
import { Box, Button, Grid, Modal, Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../firebase/auth';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const StoreItem = ({ item }) => {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [container, setContainer] = useState('');
  const [userList,setUserList] = useState([])
  const { user } = UserAuth();
  const [ownerUid,setOwnerUid]= useState('');
  const storeId = item._id;
  // console.log(user)
  const Content = styled(Typography)({
    fontFamily: 'Arial',
    fontSize: '14px',
    fontWeight: 520,
  });

  const handleClick = () => {
    setShowDetailPopup(!showDetailPopup);
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/store/storeDetail/${item.ownerId}`);
      setContainer(response.data);
      const newResponse = await axios.get(`http://localhost:5000/users`);
      setUserList(newResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(()=>{
    userList.map(users=>{
      if(users._id === item.ownerId){
        setOwnerUid(users.uid)
      }
    })
  },[userList])
  // console.log(user.uid)
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const truncatedAbout = truncateText(item.about, 50);

  return (
    <Grid item sx={{ width: '100%', marginBottom: '20px' }}>
      <Box
        onClick={() => {
          handleClick(item._id);
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginRight: '50px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#f7f7f7',
          },
        }}
      >
        <Box sx={{ flex: '0 0 200px', marginRight: '10px' }}>
          <img src={item.storePicture} height='100%' width='100%' alt='Store Image' />
        </Box>
        <Box sx={{ flex: '1' }}>
          <Box>
            <Typography variant='h5' color='success' sx={{ fontWeight: 'bold' }}>
              {item.storeName}
            </Typography>
            {item.status === 'sold-out' ? (
              <Button color='error' sx={{ mt: 0.5, fontSize: '10px', padding: '0.5px 0.5px' }} type='submit' variant='outlined'>
                Outside Valley
              </Button>
            ) : (
              <Button color='primary' sx={{ mt: 0.5, fontSize: '10px', padding: '0.5px 0.5px' }} type='submit' variant='outlined'>
                Inside Valley
              </Button>
            )}
          </Box>
          <Box>
            <Stack direction='column' sx={{ justifyContent: 'space-between', mt: 1 }}>
              <Content>Owner Name: {container.name}</Content>
              <Content>Location: {item.location}</Content>
              <Content>Website: {item.websiteUrl}</Content>
              {/* <Content><Rating name='read-only' value={item.rate} readOnly /></Content> */}
            </Stack>
          </Box>
        </Box>
        <Stack direction='column' sx={{ justifyContent: 'space-between', maxWidth: '500px', textAlign: 'justify', mr: 20 }}>
          <Typography variant='h5' color='success' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Detail
          </Typography>
          <Typography>
            {truncatedAbout}{' '}
            <Link component='button' variant='body2'>
              Read More
            </Link>
          </Typography>
        </Stack>

       
      </Box>
      {showDetailPopup && (
        <Modal
          open={showDetailPopup}
          onClose={() => setShowDetailPopup(false)}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
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
            <h2 id='modal-title' sx={{ fontWeight: 'bold', mb: 2 }}>
              Book Store Detail
            </h2>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{minWidth: '250px'}}>
              <img src={item.storePicture} height='170' width='100%' alt='Image is here' />
              {user && user.uid === ownerUid && (
                <NavLink to={`/shop/manage/${storeId}`} className="link">
                  <Button variant='outlined' color='primary' onClick={() => {}}>
                    Manage Store
                  </Button>
                </NavLink>
              )}
              </Box>
              <Box sx={{ display: 'block', padding: '0px', marginLeft: '30px', textAlign: 'justify' }}>
                <Typography> {item.about}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='outlined' onClick={() => setShowDetailPopup(false)} sx={{ mr: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Grid>
  );
};

export default StoreItem;
