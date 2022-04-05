import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material';
import FilteredItems from '../components/FilteredItems';
import { useSelector } from 'react-redux';

const ItemSearchForm = ({ updateCount }) => {
  console.debug('ItemSearchForm');

  const items = useSelector((st) => st.items);
  const [ filtered, setFiltered ] = useState(items);
  const [ item, setItem ] = useState('');
  const [ category, setCategory ] = useState(null);

  // Filter items comparing keyword to item.name and item.description
  const filter = (e) => {
    e.preventDefault();
    const keyword = e.target.value;

    // if (category !== 'All')
    //   setFiltered(filtered.filter((i) => i.category === category));

    if (keyword !== '') {
      const results = filtered.filter((item) => {
        const re = new RegExp(`${keyword}`, 'i');
        if (category) {
          console.log('category', category);
          return (
            item.category === category &&
            (item.name.search(re) !== -1 ||
              (item.description && item.description.search(re) !== -1))
          );
        } else {
          console.log('no category');
          return (
            item.name.search(re) !== -1 ||
            (item.description && item.description.search(re) !== -1)
          );
        }
      });
      setFiltered(results);
    } else {
      // If the text field is empty, show all items
      setFiltered(items);
    }

    setItem(keyword);
  };

  const handleRadio = (e) => {
    if (e.target.value === 'All') setCategory(null);
    else {
      console.log('There is no category');
      setCategory(e.target.value);
    }
    console.log(e.target.value);
  };

  return (
    <React.Fragment>
      <Stack ml={3}>
        <Box
          noValidate
          autoComplete="off"
          justifyContent="center"
          align="center"
        >
          <TextField
            type="text"
            id="item"
            name="item"
            label="Item Filter"
            variant="outlined"
            value={item}
            onChange={filter}
            autoFocus={true}
          />

          <Button
            onClick={filter}
            variant="contained"
            sx={{ marginLeft: '8px', marginTop: '10px' }}
          >
            Clear
          </Button>

          <FormControl sx={{ marginLeft: '24px' }}>
            <FormLabel id="item-category-group-label">Item Category</FormLabel>
            <RadioGroup
              row
              aria-labelledby="item-category-buttons"
              name="item-category"
              onChange={handleRadio}
              defaultValue="All"
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel
                value="Food"
                control={<Radio />}
                label="Food & Bev"
              />
              <FormControlLabel
                value="Liquor"
                control={<Radio />}
                label="Liquor"
              />
              <FormControlLabel value="Beer" control={<Radio />} label="Beer" />
              <FormControlLabel value="Wine" control={<Radio />} label="Wine" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
      <FilteredItems items={filtered} click={updateCount} />
    </React.Fragment>
  );
};

export default ItemSearchForm;
