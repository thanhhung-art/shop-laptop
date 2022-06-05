import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { editCardInfo } from '../../features/orderInfo/orderInfoSlice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../app/store';

export default function PaymentForm() {
  const cardPayment = useTypedSelector(state => state.orderInfo.cardPayment);
  const [values, setValues] = useState(cardPayment)
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    dispatch(editCardInfo({...values, [e.target.name]: e.target.value}))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardName"
            name="cardName"
            required
            label="Name on card"
            fullWidth
            variant="standard"
            value={values.cardName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            required
            name="cardNumber"
            label="Card number"
            fullWidth
            variant="standard"
            value={values.cardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            required
            name="expDate"
            label="Expiry date"
            fullWidth
            variant="standard"
            value={values.expDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cvv"
            required
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            variant="standard"
            value={values.cvv}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" sx={{color: "#7c7878", display: "block" }}>*fill full field to payment with your card</Typography>
          <Typography variant="caption" sx={{color: "#7c7878"}}>*If you don't want to use card to payment, click next button</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}