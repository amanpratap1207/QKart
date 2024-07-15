import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    if (!validateInput(formData)) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${config.endpoint}/auth/login`, formData);
      if (response.status === 201 && response.data.success) {
        const { token, username, balance } = response.data;
        // Persist user's login information
        persistLogin(token, username, balance);
        // Redirect to the products page on successful login
        history.push("/");
        // Display a success message
        enqueueSnackbar("Logged in successfully", { variant: "success" });
      } else {
        // Handle other response statuses here
        // Display error message from the backend
        enqueueSnackbar(response.data.message || "Something went wrong.", {
          variant: "error",
        });
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      enqueueSnackbar("password is incorrect", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateInput = (data) => {
    const { username, password } = data;
    if (!username || username.trim() === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (!password || password.trim() === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    return true;
  };

  const persistLogin = (token, username, balance) => {
    // Store the login information in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => login(formData)}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "LOGIN TO QKART"
            )}
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
