import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import Product from './Product';
import { CircularProgress, Pagination } from '@mui/material';
import SearchBar from './SearchBar';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const Homepage = () => {
  const [container, setContainer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(null);
  const [categories,setCategories] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const PORT = process.env.REACT_APP_PORT;



  let categoriesItem = ["Novel","Engineering Books","MBBS Books","LokSewa","BBA","BBS","CA","Other"]


  const isBigScreen = useMediaQuery('(min-width: 660px)');
  const displayItemCount = isBigScreen ? 6 : 3; // Adjust the number of items based on the screen size

  
  const handleSearch = (value) => {
    setSearchTerm(value);
    // Perform your search logic here using the value
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Perform actions based on the selected category
  };

  const handleRangeChange = (event) => {
    setStatus(event.target.value === 'null' ? null : event.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetchItems = async () => {    
    try {
      const response = await axios.get(`${PORT}books/`);
      setContainer(response.data);
      console.log(container)
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
    // Perform sorting based on price
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    // Perform searching based on search query
  };

  const handleFilterButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = container.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <Box sx={{ height: '70vh', position: 'relative' }}>
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      </Box>
    );
  }
  

  return (
    <div style={{ backgroundColor: '#f3f3f3', paddingTop: '45px'}}>
      <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', display: isBigScreen ? 'flex' : 'block' ,marginTop: 2, marginBottom: 3, marginRight: 3, marginLeft: 3}}>
          <Typography variant="h5" sx={{ color: 'black',fontWeight: 600 }}>Popular Books</Typography>
          <SearchBar onSearch={handleSearch} />
          <Button variant="contained" sx={{height: '36px'}} onClick={handleModalOpen}>
            Filter <FilterAltOutlinedIcon />
          </Button>
         </Stack>
      </Box>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <Stack direction="column">
            <TextField
                required
                select
                label="Select Category"
                value={categories}
                onChange={(event) => setCategories(event.target.value)}
                sx={{ marginTop: '20px', marginBottom: '20px', width: '100%', maxWidth: '400px' }}
              >
                {categoriesItem.map((categoryItem) => (
                  <MenuItem key={categoryItem} value={categoryItem}>
                    {categoryItem}
                  </MenuItem>
                ))}
              </TextField>

            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Sort by Price
              </Typography>
              <RadioGroup
                aria-label="Sort By"
                name="sortBy"
                value={sortOption}
                onChange={handleSortOptionChange}
                row
              >
                <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                <FormControlLabel value="desc" control={<Radio />} label="Descending" />
              </RadioGroup>
            </FormControl>
            <TextField
              select
              label="Status of Item"
              value={status}
              onChange={handleRangeChange}
              sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
            >
              <MenuItem value={null}>Select an option</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Second Hand">Second Hand</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleFilterButtonClick}>Apply Filters</Button>
        </DialogActions>
      </Dialog>

      
      <Stack direction="row" spacing={2} sx={{ width: '80%', margin: 'auto', mb: 5, justifyContent: 'center' }}>
      {categoriesItem.slice(0, displayItemCount).map((item) => (
        <Button
          key={item}
          onClick={() => handleCategoryClick(item)}
          sx={{
            borderRadius: '16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-out',
            transform: 'translateY(0)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
              boxShadow: 'none',
            },
            flexGrow: 1,
            '&:first-child': { marginLeft: 0 },
            '&:last-child': { marginRight: 0 },
          }}
        >
          {item}
        </Button>
      ))}
    </Stack>


        <Box sx={{ maxWidth: '90%', margin: 'auto', textAlign: 'center' }}>
          <Grid container justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            {currentItems.map((item) => (
              <Grid item key={item._id}>
                <Product item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>



      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(container.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </div>
  );
};

export default Homepage;

// import React from 'react'

// const Homepage = () => {
//   return (
//     <div>Homepage</div>
//   )
// }

// export default Homepage