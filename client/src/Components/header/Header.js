import React from 'react'
import NavBar from './NavBar'
import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 120px; /* Adjust the margin value as needed */
`;
const Header = () => {
  return (
     <Container>
        <NavBar />
     </Container>
  )
}

export default Header