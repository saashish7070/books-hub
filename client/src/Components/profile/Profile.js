import { useEffect, useState } from 'react';
import { UserAuth } from '../../firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Divider, ThemeProvider, Typography, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import Wishlist from '../wishlist/Wishlist';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const { user, logOut } = UserAuth();
  const [data,setData] = useState([])
  const navigate = useNavigate();
  const theme = createTheme();
  const PORT = process.env.REACT_APP_PORT;

  //Functions
  const handleLogout = () => {
    // Call the logout function to perform the logout action
    Cookies.remove('userName');
    Cookies.remove('userPhoto');
    Cookies.remove('userId');
    logOut();
    navigate('/');
  };

  
 
  
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const id = user?.uid;
  const storedUserName = Cookies.get('userName') || displayName;
  const storedUserPhoto = Cookies.get('userPhoto') || photoURL;
  const storedUserId = Cookies.get('userId') || id;
  Cookies.set('userName', storedUserName);
  Cookies.set('userPhoto', storedUserPhoto);
  Cookies.set('userId', storedUserId);

  

  const userPhotoURL = Cookies.get('userPhoto') || '';
  const userDisplayName = Cookies.get('userName') || '';
  console.log(userDisplayName)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${PORT}users/profile/${user.uid}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // fetchData();
  // Apis

  useEffect(() => {
    fetchData();
  }, []);
  
  

  //Styles
  const SectionContainer = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
    borderRadius: theme.spacing(1),
    transition: 'background-color 0.3s ease',
  }));

  const Heading = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontSize: '1.2em',
    fontWeight: 'bold',
  }));

  const SellingItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height:'10px',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  }));
  const SellingSection = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    width: '95%',
    height: '100px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: 'auto',
    maxWidth: '1200px', // Adjust the max width as needed
  }));
  
  const CustomSectionContainer = styled('div')(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
    borderRadius: theme.spacing(1),
    transition: 'background-color 0.3s ease',
  }));
  
  const CustomHeading = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontSize: '1.2em',
    fontWeight: 'bold',
  }));
  
  const StoreSection = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
  });
  
  const StoreItem = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '420px',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  }));
  return (
    <div style={{ padding: '70px 0 25px 0' }}>
  
    <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Avatar src={userPhotoURL} alt="User Avatar" sx={{ width: 80, height: 80, marginRight: 2 }} />
          {/* <Typography variant="h4">{userDisplayName}</Typography> */}
        </Box>

        <SectionContainer marginTop={3} marginBottom={3} width="100%">
          <Typography variant="h6">Account Information</Typography>
          <Divider />
          <Typography variant="subtitle1">
          <b>Name</b>: {data && <>{data.name}</>}
          <span style={{ marginLeft: '15px' ,cursor: 'pointer'}}>
                <EditIcon sx={{ height: '15px', color:'#403BD6' }} />
                Edit
          </span>
          </Typography>
          <Typography variant="subtitle1">
            <b>Email</b>: {data && <>{data.email}</>}
            <span style={{ marginLeft: '15px' ,cursor: 'pointer'}}>
                <EditIcon sx={{ height: '15px', color:'#403BD6' }} />
                Edit
          </span>
          </Typography>
          <Typography variant="subtitle1">
            <b>Contact</b>: {data.contact ? data.contact : "Not mentioned"}
            <span style={{ marginLeft: '15px' ,cursor: 'pointer'}}>
                <EditIcon sx={{ height: '15px', color:'#403BD6' }} />
                Edit
          </span>
          </Typography>
          <Typography variant="subtitle1">
            <b>Billing Address</b>: {data.userAddress ? <>{data.userAddress.address},{data.userAddress.area},{data.userAddress.city},{data.userAddress.province}</> : "Not mentioned"}
            <span style={{ marginLeft: '15px' ,cursor: 'pointer'}}>
                <EditIcon sx={{ height: '15px', color:'#403BD6' }} />
                Edit
          </span>
          </Typography>
          <Typography variant="subtitle1">
            <b>Social Media</b>: {data.facebookId ? data.facebookId : "Not mentioned"}
            <span style={{ marginLeft: '15px' ,cursor: 'pointer'}}>
                <EditIcon sx={{ height: '15px', color:'#403BD6' }} />
                Edit
          </span>
          </Typography>           
        </SectionContainer>

        <CustomSectionContainer marginTop={3} marginBottom={3}>
        
        <SectionContainer marginTop={3} marginBottom={3}>
          <Heading variant="h6">Selling Section</Heading>
          <Divider />
          <SellingSection>
            <NavLink to="/sellItem" className="link">
              <SectionContainer component={Button} variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
                <SellingItem>
                  <Typography variant="subtitle1" sx={{color: 'black'}}>Sell</Typography>
                </SellingItem>
              </SectionContainer>
            </NavLink>

            <NavLink to="/itemList" className="link">
              <SectionContainer component={Button} variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
                <SellingItem>
                  <Typography variant="subtitle1" sx={{color: 'black'}}>List of Items</Typography>
                </SellingItem>
              </SectionContainer>
            </NavLink>
            
          </SellingSection>
        </SectionContainer>
        {/* <NavLink to="/itemStatus" className="link"> */}
            {/* <NavLink to="/coming-soon" className="link">
              <SectionContainer component={Button} variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
                <SellingItem>
                  <Typography variant="subtitle1" sx={{color: 'black'}}>Status of Items</Typography>
                </SellingItem>
              </SectionContainer>
            </NavLink> */}
        <SectionContainer marginTop={3} marginBottom={3}>
          {/* <Typography variant="h6">Watch List</Typography> */}
          {/* <Divider /> */}
          <Wishlist />
          {/* Order history components */}
        </SectionContainer>

        {/* <SectionContainer marginTop={3} marginBottom={3}> */}

        {/* <CustomHeading variant="h6">Store Section</CustomHeading>
        <Divider />
        <Typography variant="paragraph">Coming Soon</Typography> */}
        {/* <StoreSection > */}
          {/* <NavLink to="/coming-soon" className="link"> */}
          {/* <NavLink to="/shop/addStore" className="link"> */}
            {/* <CustomSectionContainer component={Button} variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
              <StoreItem>
                <Typography variant="subtitle1" sx={{ color: 'black' }}>Add Store</Typography>
              </StoreItem>
            </CustomSectionContainer>
          </NavLink> */}
          {/* <NavLink to="/shop/manageStore" className="link"> */}
          {/* <NavLink to="/coming-soon" className="link">
            <CustomSectionContainer component={Button} variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
              <StoreItem>
                <Typography variant="subtitle1" sx={{ color: 'black' }}>Manage Store</Typography>
              </StoreItem>
            </CustomSectionContainer>
          </NavLink>
        </StoreSection> */}
        {/* </SectionContainer> */}
      </CustomSectionContainer>

        <Box marginTop={4}>
          
          <Box display="block">
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
