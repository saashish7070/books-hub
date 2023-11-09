import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function ItemStatus({ checkoutStatus, deliveryStatus, billingStatus, sellingItems }) {
  return (
    <Container maxWidth="s">
      <Container
        sx={{
          background: '#f5f5f5',
          padding: 2,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Buying Status
        </Typography>
        {Array.isArray(checkoutStatus) && checkoutStatus.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkoutStatus.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <IconButton>
                      {/* <CancelIcon /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">No items in checkout.</Typography>
        )}
      </Container>

      <Container
        sx={{
          background: '#f5f5f5',
          padding: 2,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Billing Status
        </Typography>
        {Array.isArray(billingStatus) && billingStatus.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billingStatus.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <IconButton>
                      {/* <CancelIcon /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">Feature is coming soon..</Typography>
        )}
      </Container>

      <Container
        sx={{
          background: '#f5f5f5',
          padding: 2,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Delivery Status
        </Typography>
        {Array.isArray(deliveryStatus) && deliveryStatus.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryStatus.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <IconButton>
                      {/* <CancelIcon /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">No items in delivery.</Typography>
        )}
      </Container>

      <Container
        sx={{
          background: '#f5f5f5',
          padding: 2,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Selling Status
        </Typography>
        {Array.isArray(sellingItems) && sellingItems.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Verify</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <IconButton>
                      {/* Add verify icon here */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">No items for selling.</Typography>
        )}
      </Container>
    </Container>
  );
}

export default ItemStatus;
