import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "@/store/authSlice";
import { registerApi, loginApi } from "@/api/account/api";
import "./style.scss";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Authenticate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataSubmit = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const res = await loginApi(dataSubmit);
    if (res) {
      localStorage.setItem("accessToken", res.accessToken);
      dispatch(
        login({
          accessToken: res.accessToken,
          username: dataSubmit.username,
          password: dataSubmit.password,
          id: res.id,
        })
      );
      navigate("/");
      toast.success("Login success");
    } else {
      toast.error("Login failed");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataSubmit = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const res = await registerApi(dataSubmit);
    if (res) {
      toast.success("Register successfully! Now you can login");
      setIsRegister(false);
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? "Sign up" : "Sign in"}
        </Typography>
        {!isRegister ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              key="usr-lg"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              defaultValue={"mercifulThrushe4"}
            />
            <TextField
              key="ps-lg"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              defaultValue={"12345678"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => setIsRegister(true)}
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              key="usr-rg"
              margin="normal"
              required
              fullWidth
              id="username-register"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              key="ps-rg"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password-register"
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
                <Link
                  onClick={() => setIsRegister(false)}
                  href="#"
                  variant="body2"
                >
                  {"Have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </div>
  );
}
