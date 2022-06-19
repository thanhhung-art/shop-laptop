import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setUser } from "../features/user/userSlice";
import { useMutation } from "react-query";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = React.useState(true);
  const [hideConfirmPass, setHideConfirmPass] = React.useState(true);
  const [register, setRegister] = React.useState({
    success: false,
    error: {
      email: false,
    },
    message: {
      email: ""
    }
  })

  const postData = useMutation((values: UserRegister) => {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(values)
    }).then( res => res.json())
  }, {
    onSuccess: (data) => {
      if (data === "User already exists") {
        setRegister({
          success: false,
          error: {
            email: true,
          },
          message: {
            email: data
          }
        })
        return
      }

      setRegister({
        success: true,
        error: {
          email: false,
        },
        message: {
          email: ""
        }
      })
      dispatch(setUser({_id: data._id}))
      router.push("/login");
    }
  })

  const router = useRouter();
  const Formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: (values) => {
      const { username, email, password } = values;
      postData.mutate({ username, email, password })
    },
  });

  const resetRegister = () => setRegister({
    success: false,
    error: {
      email: false,
    },
    message: {
      email: "",
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={Formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={Formik.handleChange}
              value={Formik.values.username}
              error={Boolean(Formik.errors.username)}
              helperText={Formik.touched.username && Formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={Formik.handleChange}
              value={Formik.values.email}
              error={Boolean(Formik.errors.email) || register.error.email}
              helperText={Formik.touched.email && Formik.errors.email || register.message.email}
              onFocus={resetRegister}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={hidePassword ? "password" : "text"}
              id="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              error={Formik.errors.password ? true : false}
              helperText={Formik.touched.password && Formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <span onClick={() => setHidePassword(!hidePassword)} style={{cursor: "pointer"}}>
                      {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm password"
              type={hideConfirmPass ? "password" : "text"}
              id="confimPassword"
              value={Formik.values.confirmPassword}
              onChange={Formik.handleChange}
              error={Formik.errors.confirmPassword ? true : false}
              helperText={
                Formik.touched.confirmPassword && Formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <span onClick={() => setHideConfirmPass(!hideConfirmPass)} style={{cursor: "pointer"}}>
                      {hideConfirmPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
