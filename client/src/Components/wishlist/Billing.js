import React, { useState } from 'react';
import { Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TextField, Button, Grid, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, RadioGroup, Radio, Snackbar } from '@mui/material';
import axios from 'axios';
import { UserAuth } from '../../firebase/auth';

const Billing = () => {
  const { user } = UserAuth();
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    mobileNumber: '',
    province: '',
    city: '',
    area: '',
    address: '',
    landmark: '',
    isDefaultShipping: false,
    isDefaultBilling: false
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setBillingInfo((prevInfo) => ({ ...prevInfo, [name]: checked }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the required fields is empty
    if (
      billingInfo.fullName === '' ||
      billingInfo.mobileNumber === '' ||
      billingInfo.province === '' ||
      billingInfo.city === '' ||
      billingInfo.area === '' ||
      billingInfo.address === ''
    ) {
      setAlertMessage('Please fill in all the required fields.');
      setShowAlert(true);
      return;
    }

    setPopupOpen(false);
  };
  

  const handleCheckOut = () => {
    if (validateForm()) {
      axios
      .post('http://localhost:5000/users/checkOut', {billingInfo,user})
      .then(response => {
        console.log(response.data.message)
      })
      // Perform the checkout logic here
      
      // Clear the billing info
      // setBillingInfo({
      //   fullName: '',
      //   mobileNumber: '',
      //   province: '',
      //   city: '',
      //   area: '',
      //   address: '',
      //   landmark: '',
      //   isDefaultShipping: false,
      //   isDefaultBilling: false,
      // });
    } else {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
    }
  };

  const validateForm = () => {
    const {
      fullName,
      mobileNumber,
      province,
      city,
      area,
      address,
    } = billingInfo;

    return (
      fullName !== '' &&
      mobileNumber !== '' &&
      province !== '' &&
      city !== '' &&
      area !== '' &&
      address !== ''
    );
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const cancelPopup = () => {
    setPopupOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderUserDetails = () => (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>User Details</Typography>
      <TableContainer sx={{ border: '1px solid gray', mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Full Name:</strong>
              </TableCell>
              <TableCell>{billingInfo.fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Mobile Number:</strong>
              </TableCell>
              <TableCell>{billingInfo.mobileNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Province:</strong>
              </TableCell>
              <TableCell>{billingInfo.province}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>City:</strong>
              </TableCell>
              <TableCell>{billingInfo.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Area:</strong>
              </TableCell>
              <TableCell>{billingInfo.area}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Address:</strong>
              </TableCell>
              <TableCell>{billingInfo.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Landmark:</strong>
              </TableCell>
              <TableCell>{billingInfo.landmark}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Default Shipping Address:</strong>
              </TableCell>
              <TableCell>{billingInfo.isDefaultShipping ? 'Yes' : 'No'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Default Billing Address:</strong>
              </TableCell>
              <TableCell>{billingInfo.isDefaultBilling ? 'Yes' : 'No'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Delivery Option:</strong>
              </TableCell>
              <TableCell>
                <RadioGroup
                  name="deliveryOption"
                  value={billingInfo.deliveryOption}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    value="cashOnDelivery"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="onlinePayment"
                    control={<Radio />}
                    label="Online Payment"
                  />
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button variant="contained" onClick={handleCheckOut}>Checkout</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="sm">
    <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
      <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
        {snackbarMessage}
      </Alert>
    </Snackbar>

      <Typography variant="h4" gutterBottom>Billing Information</Typography>
      <Button variant="contained" color="primary" onClick={openPopup}>
        Enter Details
      </Button>
      <Dialog open={isPopupOpen} onClose={cancelPopup}>
        <DialogTitle>Billing Information</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="mod-address-form mod-np">
              <div className="mod-address-form-bd">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="fullName"
                      value={billingInfo.fullName}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mobile Number"
                      name="mobileNumber"
                      value={billingInfo.mobileNumber}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Province"
                      name="province"
                      value={billingInfo.province}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Area"
                      name="area"
                      value={billingInfo.area}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      name="address"
                      value={billingInfo.address}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Landmark (Optional)"
                      name="landmark"
                      value={billingInfo.landmark}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isDefaultShipping"
                          checked={billingInfo.isDefaultShipping}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Default shipping address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isDefaultBilling"
                          checked={billingInfo.isDefaultBilling}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Default billing address"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      {!isPopupOpen && renderUserDetails()}

      
    </Container>
  );
};

export default Billing;
