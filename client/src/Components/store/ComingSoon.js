import React from 'react';
import { Container, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';

// ComingSoon component with fade-in animation
export const ComingSoon = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={props}>
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 ,p: 20}}>
        <Typography variant="h2" color="primary" gutterBottom>
          Coming Soon!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          We're working hard to bring you something amazing. Stay tuned for updates!
        </Typography>
        {/* Add your attractive animation component here */}
      </Container>
    </animated.div>
  );
};
