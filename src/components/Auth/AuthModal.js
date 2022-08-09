import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Tabs, Tab } from "@mui/material";
import GoogleButton from "react-google-button";
import { handleAlert } from "../../features/cryptoSlice";
import { signOut, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(
          handleAlert({
            opem: true,
            message: `Sign up successful. Welcome ${res.user.email}`,
          })
        );
        handleClose();
      })
      .catch((error) => {
        dispatch(
          handleAlert({
            open: true,
            message: error.message,
            type: "error",
          })
        );
      });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "gold",
        }}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box
              style={{
                padding: 24,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 20,
                fontSize: 20,
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
