import styled from '@emotion/styled';
import {  AppBar, Avatar, Box, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import "./navbar.css";
import { UserAuth } from '../../firebase/auth';
import { useEffect, useState } from 'react';
import Protected from '../../firebase/Protected';


const AppBarStyle = styled(AppBar)`
  transition: all 0.3s ease-in-out;
  ${({ shrink }) =>
    shrink &&
    `
    background-color: #000000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `}

  ${({ shrink }) =>
    !shrink &&
    `
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #333333;
    margin: none;
  `}
`;


const Navbar = () => {
  const { user,googleSignIn } = UserAuth();
  const [shrinkNavbar, setShrinkNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShrinkNavbar(true);
      } else {
        setShrinkNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavTool = styled(Toolbar)({
    justifyContent: 'space-between',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    margin: 'none' // Add margin bottom to create space for elements below the navigation bar
  });
  
  const MenuData = styled(Box)({
    justifyContent:'space-between',
    '@media (max-width: 900px)': {
      display:'none',
      marginTop: '20px',
    },
  });
  const Typo = styled(Typography)({
    minWidth: 20,
    color: 'white',
    cursor: 'pointer',
    p:0.1,
    '&:hover': {
      color: '#ffc107',
    },
  });
  const NavElement = styled(Stack)({
    marginTop: '10px',
    marginRight: '30px',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      color: '#ffc107',
    },
    '@media (max-width: 900px)': {
      margin: '10px 0',
    },
  });
  const StyledAvatar = styled(Avatar)(() => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  }));
  
  return (
    <AppBarStyle position="fixed" shrink={shrinkNavbar}>  
      <NavTool>
        <NavLink to='/' className= 'link'>
          <Typo variant="h6">
            <strong>Books Hub</strong>
          </Typo>
        </NavLink>
        <MenuData>
          <Box sx={{ display: { sm: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
            <NavElement direction='row'>
              <NavLink to='/' className='link'>
                <Typo>Home</Typo>
              </NavLink>
            </NavElement>
            <NavElement direction='row'>
              <NavLink to='/coming-soon' className= 'link'>
                <Typo>Store</Typo>
              </NavLink>
            </NavElement>
            <NavElement direction='row'>
              <NavLink to='/wishlist' className= 'link'>
                  <Typo>Wishlist</Typo>
              </NavLink>
            </NavElement>  
            {!user && (
                  <NavElement direction='row'>
                    <Typography variant='body1' className='link' onClick={googleSignIn}>
                      Login
                    </Typography>
                  </NavElement>
                )}
            {user && (
                  <NavElement direction='row'>
                    <NavLink to='/profile' className= 'link'>
                        <StyledAvatar 
                        src={user.photoURL}
                        alt='Profile Photo'
                        />
                    </NavLink>
                  </NavElement>
                )}          
              
          </Box>
          {/* <IconButton sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }} >
              <Menu />
          </IconButton> */}
        </MenuData>
        
      </NavTool>
      
    </AppBarStyle>
  );
};

export default Navbar;