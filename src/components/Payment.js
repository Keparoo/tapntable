import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getOpenChecksFromAPI } from '../actions/checks';
import TapntableApi from '../api/api';
import {
  CASH,
  MASTER_CARD,
  VISA,
  AMERICAN_EXPRESS,
  DISCOVER,
  GOOGLE_PAY,
  APPLE_PAY,
  VENMO
} from '../constants';

import { Typography, Stack, Button, Container, Paper } from '@mui/material';
import PayAmountForm from './PayAmountForm';

const Payment = ({ showPayment }) => {
  console.debug('Payment');

  const user = useSelector((st) => st.user, shallowEqual);
  const check = useSelector((st) => st.currentCheck, shallowEqual);
  const dispatch = useDispatch();

  const [ showPaymentAmountForm, setShowPaymentAmountForm ] = useState(false);
  const [ paymentType, setPaymentType ] = useState('');

  // Post new payment to db
  const savePayment = async ({ amount }) => {
    console.debug('savePayment', amount);

    if (amount > check.amountDue) amount = check.amountDue;
    if (amount <= 0) {
      setShowPaymentAmountForm(false);
      return;
    }

    const newPayment = await TapntableApi.postPayment(
      check.id,
      paymentType,
      +amount
    );
    console.log('New Credit Payment Made', newPayment);

    if (check.amountDue - amount === 0) {
      const closeCheck = await TapntableApi.closeCheck(
        check.id,
        check.subtotal,
        check.localTax,
        check.stateTax,
        check.federalTax
      );
      console.log('Close check', closeCheck);
    }

    showPayment(false);
    await dispatch(getOpenChecksFromAPI(user.id));
  };

  // Close PayAmount form
  const cancelPayment = () => {
    console.debug('cancelPayment');

    setShowPaymentAmountForm(false);
    showPayment(false);
  };

  // Pay by credit
  const credit = async (type) => {
    console.debug('pay', type);

    setPaymentType(type);
    setShowPaymentAmountForm(true);
  };

  // Pay by cash: Should be done after all credit payments-- Check is closed
  const cash = async () => {
    console.log(cash);

    const newPayment = await TapntableApi.postPayment(
      check.id,
      CASH,
      check.amountDue
    );
    console.log('New Cash Payment Made', newPayment);
    const closeCheck = await TapntableApi.closeCheck(
      check.id,
      check.subtotal,
      check.localTax,
      check.stateTax,
      check.federalTax
    );

    console.log('Close check', closeCheck);
    showPayment(false);
    // Update redux open checks
    await dispatch(getOpenChecksFromAPI(user.id));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Paper sx={{ marginTop: '15vh' }} elevation={3}>
          <Typography variant="h3" align="center" gutterBottom>
            Payment
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={() => credit(MASTER_CARD)} variant="contained">
              Master Card
            </Button>
            <Button onClick={() => credit(VISA)} variant="contained">
              Visa
            </Button>
            <Button
              onClick={() => credit(AMERICAN_EXPRESS)}
              variant="contained"
            >
              Amex
            </Button>
            <Button onClick={() => credit(DISCOVER)} variant="contained">
              Discover
            </Button>
          </Stack>
          <br />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              onClick={() => credit(GOOGLE_PAY)}
              variant="contained"
              color="secondary"
            >
              Google Pay
            </Button>
            <Button
              onClick={() => credit(APPLE_PAY)}
              variant="contained"
              color="secondary"
            >
              Apple Pay
            </Button>
            <Button
              onClick={() => credit(VENMO)}
              variant="contained"
              color="secondary"
            >
              Venmo
            </Button>
          </Stack>
          <br />
          <Stack spacing={2} justifyContent="center">
            <Button onClick={cash} variant="contained">
              Cash
            </Button>
            <Button onClick={cancelPayment}>Cancel Payment</Button>
          </Stack>

          {showPaymentAmountForm && (
            <PayAmountForm
              amount={check.amountDue.toFixed(2)}
              save={savePayment}
              cancel={cancelPayment}
            />
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Payment;