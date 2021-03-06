import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PayAmountForm = ({ amount, save, cancel }) => {
  console.debug('PayAmountForm', amount);

  const [ form, setForm ] = useState({ amount });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('PaymentAmountForm handleSubmit');
    e.preventDefault();
    save({ ...form });
  }

  const clear = () => {
    setForm({ amount: 0 });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        justifyContent: 'center'
      }}
      noValidate
      autoComplete="off"
      justifyContent="center"
    >
      <TextField
        type="number"
        id="amount"
        name="amount"
        label="Balance"
        variant="outlined"
        autoFocus={true}
        value={form.amount}
        onChange={handleChange}
      />

      <Button type="submit" onClick={handleSubmit} variant="contained">
        Submit
      </Button>
      <Button onClick={clear} variant="contained" color="secondary">
        Clear
      </Button>
    </Box>
  );
};

export default PayAmountForm;
