import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory(); 

  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  
  const register = async (formData) => {
    console.log(formData);
    if (!validateInput(formData)) {
      return;
    }

    try {
      const response = await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        enqueueSnackbar("Registered successfully", { variant: "success" });
        // Redirect to the login page on successful registration
        history.push("/login");
      } else if (response.status === 400) {
        enqueueSnackbar(response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable, and returns valid JSON.",
          { variant: "error" }
        );
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx. Show the error message from the backend.
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error).
        enqueueSnackbar("Network error. Check your internet connection.", {
          variant: "error",
        });
      } else {
        // Something else happened in making the request.
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable, and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };
  // Step 3: Implement user input validation logic
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;

    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }

    if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" });
      return false;
    }

    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }

    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }

    return true;
  };

  // Step 4: Add event handlers to update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
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
            helperText="Password must be at least 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button className="button" variant="contained" onClick={() => register(formData)}>
  Register Now
</Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">Login Here</Link>
          </p>
        </Stack>
        
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
