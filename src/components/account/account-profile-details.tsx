import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import CryptoJS from "crypto-js";
import { useMutation, UseQueryResult } from "react-query";
import { notify } from "../DisplayToast";

export const AccountProfileDetails = ({ userInfo }: { userInfo: UseQueryResult<User> }) => {
  
  const [values, setValues] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (userInfo.data) {
      setValues({
        ...userInfo.data,
        password: CryptoJS.AES.decrypt(userInfo.data.password, process.env.NEXT_PUBLIC_PASSWORD || "").toString(CryptoJS.enc.Utf8)
      })
    }
  },[userInfo.data])

  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const updateUser = useMutation(
    (data: UserUpdate) => {
      return fetch(`/api/users/${values._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
        notify("update user success");
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = CryptoJS.AES.encrypt(
      values.password,
      process.env.NEXT_PUBLIC_PASSWORD || ""
    ).toString();
    const { username, email, address, phone } = values;

    await updateUser.mutate({ username, email, address, phone, password });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="username"
                name="username"
                onChange={handleChange}
                required
                value={values.username || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type={showPass ? "text" : "password"}
                label="Password"
                name="password"
                onChange={handleChange}
                required
                value={values.password || ""}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <span
                      onClick={() => setShowPass(!showPass)}
                      style={{ cursor: "pointer" }}
                    >
                      <InputAdornment position="end">
                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="phone"
                name="phone"
                onChange={handleChange}
                required
                value={values.phone || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address || ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
