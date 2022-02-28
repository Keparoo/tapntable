import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography
} from '@mui/material';

const UserPinForm = ({ login }) => {
  console.debug('UserPinForm');

  const [ pin, setPin ] = useState('');
  const [ formError, setFormError ] = useState(false);

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('UserPinForm handleSubmit');
    e.preventDefault();

    if (!pin) setFormError(true);

    if (pin) login(pin);
  }

  const clear = () => {
    setPin('');
    setFormError(false);
  };

  return (
    <Container align="center">
      <Paper elevation={3} sx={{ paddingBottom: 8 }}>
        <Typography variant="h3" align="center" mt={24} pt={8} gutterBottom>
          Please Log in
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            onChange={(e) => setPin(e.target.value)}
            type="number"
            id="pin"
            name="pin"
            label="User Pin"
            variant="outlined"
            value={pin}
            required
            helperText="Please enter your pin"
            error={formError}
          />

          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
          <Button onClick={clear} variant="contained">
            Clear
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserPinForm;
