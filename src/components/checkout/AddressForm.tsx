import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { editUserInfo } from "../../features/orderInfo/orderInfoSlice";
import { useQuery } from "react-query";

export default function AddressForm() {
  const userID = useTypedSelector((state) => state.user.info._id);
  const userSaved = useQuery<User>(
    ["getProduct", userID],
    () => {
      return fetch(`/api/users/find/${userID}`).then((res) => res.json());
    },
    {
      enabled: userID ? true : false,
    }
  );

  const [values, setValues] = useState<{
    username: string;
    address: string;
    phone: string;
    email: string;
  }>({
    username: userSaved.data?.username || "",
    email: userSaved.data?.email || "",
    phone: userSaved.data?.phone || "",
    address: userSaved.data?.address || "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setValues({
      username: userSaved.data?.username || "",
      email: userSaved.data?.email || "",
      phone: userSaved.data?.phone || "",
      address: userSaved.data?.address || "",
    });
    dispatch(editUserInfo({ ...values }));
  }, [userSaved.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    dispatch(
      editUserInfo({ ...values, [event.target.name]: event.target.value })
    );
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
