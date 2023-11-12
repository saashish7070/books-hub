import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      sx={{
        padding: '8px 40px', // Adjusted padding for a smaller height
        margin: 'auto',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          height: '36px', // Adjusted height for a smaller input field
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onSearch()}>
              {/* You can replace this with your preferred search action */}
              {/* <SearchIcon /> */}
            </IconButton>
          </InputAdornment>
        ),
      }}
      // onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
