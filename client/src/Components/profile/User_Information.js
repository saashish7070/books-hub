import styled from '@emotion/styled';
import { TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PORT = process.env.REACT_APP_PORT;

const UserInformationContainer = styled('div')({
  textAlign: 'center',
  width: '50%',
  margin: 'auto',
  marginTop: '20px',
});

const SmallHeightTextField = styled(TextField)({
  width: '30%',
  padding: '0',
  maxWidth: '400px',
  '& input': {
    height: '7px', // Adjust the height as needed
  },
  '& label': {
    fontSize: '13px', // Adjust the font size of the label
  },
});

const User_Information = ({ data }) => {
  const [userData, setUserData] = useState(data); // Use a state variable to store user data
  const [newContact, setNewContact] = useState('');
  const [newFacebookId, setNewFacebookId] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    setUserData(data); // Update user data when the prop data changes
  }, [data]);

  const handleSaveContact = async () => {
    try {
      const contactUser = {
        contact: newContact,
      };

      const response = await axios.patch(`${PORT}users/profile/${userData._id}`, contactUser);
      console.log('Contact saved:', newContact);

      // Update the user data with the response data
      setUserData(response.data);

      // Clear the input field after saving
      setNewContact('');
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleSaveFacebookId = async () => {
    try {
      const facebookIdUser = {
        facebookId: newFacebookId,
      };

      const response = await axios.patch(`${PORT}users/profile/${userData._id}`, facebookIdUser);
      console.log('FacebookId saved:', newFacebookId);

      // Update the user data with the response data
      setUserData(response.data);

      // Clear the input field after saving
      setNewFacebookId('');
    } catch (error) {
      console.error('Error saving FacebookId:', error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const addressUser = {
        userAddress: {
          city: newAddress,
        },
      };

      const response = await axios.patch(`${PORT}users/profile/${userData._id}`, addressUser);
      console.log('Address saved:', newAddress);

      // Update the user data with the response data
      setUserData(response.data);

      // Clear the input field after saving
      setNewAddress('');
    } catch (error) {
      console.error('Error saving Address:', error);
    }
  };

  return (
    <UserInformationContainer>
      <Typography variant="body1">
        Name: <b>{userData.name}</b>
      </Typography>
      <Typography variant="body1">
        Email: <b>{userData.email}</b>
      </Typography>
      {userData.contact ? (
        <>
          <Typography variant="body1">
            Contact: <b>{userData.contact}</b>
          </Typography>
        </>
      ) : (
        <>
          Contact: <br />
          <SmallHeightTextField
            label="New Contact"
            value={newContact}
            onChange={(event) => setNewContact(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveContact} sx={{ height: '40px' }}>
            Save Contact
          </Button>
        </>
      )}
      {userData.facebookId ? (
        <>
          <Typography variant="body1">
            FacebookId: <b>{userData.facebookId}</b>
          </Typography>
        </>
      ) : (
        <>
          FacebookId: <br />
          <SmallHeightTextField
            label="New Facebook"
            value={newFacebookId}
            onChange={(event) => setNewFacebookId(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveFacebookId} sx={{ height: '40px' }}>
            Save FacebookId
          </Button>
        </>
      )}
      {userData.userAddress ? (
        <>
          <Typography variant="body1">
            Address: <b>{userData.userAddress.city}</b>
          </Typography>
        </>
      ) : (
        <>
          Address: <br />
          <SmallHeightTextField
            label="Add your City"
            value={newAddress}
            onChange={(event) => setNewAddress(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveAddress} sx={{ height: '40px' }}>
            Save Address
          </Button>
        </>
      )}
    </UserInformationContainer>
  );
};

export default User_Information;
