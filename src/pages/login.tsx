import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useTypedSelector } from "../app/store";
import Navbar from "../components/navbar/Navbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { CircularProgress } from "@mui/material";
import { useMutation } from "react-query";

const theme = createTheme();

export default function SignIn() {
  const [login, setLogin] = React.useState({
    success: false,
    error: {
      email: false,
      password: false,
    },
    message: {
      email: "",
      password: "",
    },
  });

  const postData = useMutation((values: UserLogin) => {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then( res => res.json());
  }, {
    onSuccess: (data) => {
      if (data === "Email not found") {
        setLogin({
          success: false,
          error: {
            email: true,
            password: false,
          },
          message: {
            email: "Email not found",
            password: "",
          },
        });
        return
      }

      if (data === "Invalid password") {
        setLogin({
          success: false,
          error: {
            email: false,
            password: true,
          },
          message: {
            email: "",
            password: "Invalid password",
          },
        });
        return
      }

      setLogin({
        success: true,
        error: {
          email: false,
          password: false,
        },
        message: {
          email: "",
          password: "",
        },
      });
      dispatch(setUser(data.user));
      router.push("/");
    },
  })
  
  const dispatch = useDispatch();
  const userState = useTypedSelector((state) => state.user);
  const [hide, setHide] = React.useState(true);
  
  const router = useRouter();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      postData.mutate(values);
    },
  });

  const handleHidePassword = () => {
    setHide(!hide);
  };

  const resetLogin = () =>
    setLogin({
      success: false,
      error: {
        email: false,
        password: false,
      },
      message: {
        email: "",
        password: "",
      },
    });

  return (
    <>
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
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={Formik.handleChange}
                value={Formik.values.email}
                error={Boolean(Formik.errors.email) || login.error.email}
                helperText={
                  (Formik.touched.email && Formik.errors.email) ||
                  login.message.email
                }
                onFocus={resetLogin}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={hide ? "password" : "text"}
                id="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                error={login.error.password}
                helperText={login.message.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <span
                        onClick={handleHidePassword}
                        style={{ cursor: "pointer" }}
                      >
                        {hide ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </span>
                    </InputAdornment>
                  ),
                }}
                onFocus={resetLogin}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {userState.status === "loading" ? (
                  <CircularProgress />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="caption">
                    Don&#39;t have an account?{" "}
                    <Link href="/signup">
                      <a style={{ color: "#333" }}>Sign Up</a>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
