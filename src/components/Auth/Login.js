import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "../../features/cryptoSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    if (!email || !password) {
      dispatch(
        handleAlert({
          open: true,
          message: "Passwords do not match.",
          type: "error",
        })
      );
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        handleAlert({
          open: true,
          message: `Welcome back ${result.user.email}`,
          type: "success",
        })
      );

      handleClose();
    } catch (error) {
      dispatch(
        handleAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
      handleClose();
    }
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        varaint="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        varaint="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "gold" }}
        onClick={handleSubmit}
      >
        Log in
      </Button>
    </Box>
  );
};

export default Login;
