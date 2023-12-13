import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching is going")
    onSearch(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // console.log("Enter press")
      handleSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      value={searchText}
      sx={{
        padding: '8px 40px',
        margin: 'auto',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          height: '36px',
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
            <IconButton onClick={handleSearch}>
              {/* You can replace this with your preferred search action */}
              {/* <SearchIcon /> */}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchBar;
