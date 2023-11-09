import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';


const FooterWrapper = styled(Box)({
  background: '#212121',
  color: 'white',
  padding: '40px 20px',
  marginTop: 'auto',// Ensure the footer sticks to the bottom
  marginBottom: '0px', 
  flexShrink: 0, // Prevent the footer from shrinking
});

const CompanyDetails = styled(Box)({
  '& h5': {
    marginBottom: '10px',
  },
  '& p': {
    margin: 0,
  },
});

const HelpDesk = styled(Box)({
  '& h5': {
    marginBottom: '10px',
  },
  '& p': {
    margin: 0,
  },
});

const MapLocation = styled(Box)({
  '& h5': {
    marginBottom: '10px',
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <CompanyDetails>
            <Typography variant="h5">Company Name</Typography>
            <Typography variant="body1">BookExchanger</Typography>
            <Typography variant="body1">
              &copy; 2023 BookExchanger. All rights reserved.
            </Typography>
          </CompanyDetails>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HelpDesk>
            <Typography variant="h5">Help Desk</Typography>
            <Typography variant="body1">
              Phone: +1 123 456 789<br />
              Email: help@company.com
            </Typography>
          </HelpDesk>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MapLocation>
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Location</Typography>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-122.12345678901234!3d37.98765432109876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTknMjYuMyJTIDxwRw!5e0!3m2!1sen!2sus!4v1529086203587"
                width="100%"
                height="200"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </Grid>
          </MapLocation>
        </Grid>
      </Grid>
    </FooterWrapper>
  );
};

export default Footer;