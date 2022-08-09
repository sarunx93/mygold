import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import useStyles from "./HeaderStyles";
import React from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeCurrency } from "../features/cryptoSlice";
import { setSymbols } from "../features/cryptoSlice";
import UserSidebar from "./Auth/UserSidebar";
import AuthModal from "./Auth/AuthModal";
const Header = () => {
  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const dispatch = useDispatch();
  const { currency, user } = useSelector((store) => store.crypto);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link to="/">
              <Typography className={classes.title} variant="h6">
                Crypto Hunter
              </Typography>
            </Link>
            <Select
              varian="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => dispatch(handleChangeCurrency(e.target.value))}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"THB"}>THB</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
