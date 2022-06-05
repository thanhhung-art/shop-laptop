import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { editUserInfo } from "../../features/orderInfo/orderInfoSlice";

export default function AddressForm() {
  const userSaved = useTypedSelector((state) => state.user.info);
  const [values, setValues] = useState<{
    username: string;
    address: string;
    phone: string;
    email: string;
  }>({
    username: userSaved?.username || "",
    email: userSaved?.email || "",
    phone: userSaved?.phone || "",
    address: userSaved?.address || "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editUserInfo(values));
  },[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    dispatch(editUserInfo({ ...values, [event.target.name]: event.target.value }));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="username"
            fullWidth
            label="username"
            name="username"
            onChange={handleChange}
            required
            value={values.username}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            fullWidth
            label="Phone"
            name="phone"
            onChange={handleChange}
            required
            value={values.phone}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            required
            value={values.email}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            onChange={handleChange}
            value={values.address}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
