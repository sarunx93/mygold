import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { signOut, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, db } from "../../config/firebase";
import { handleAlert } from "../../features/cryptoSlice";
import { numberWithCommas } from "../Carousel";
import { doc, setDoc } from "firebase/firestore";
const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Montserrat",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "gold",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });
  const { currency, user, watchlist, coins, symbol } = useSelector(
    (store) => store.crypto
  );
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    signOut(auth);
    dispatch(
      handleAlert({
        open: true,
        type: "success",
        message: "Logout Successful",
      })
    );
    toggleDrawer();
  };
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      dispatch(
        handleAlert({
          open: true,
          message: `${coin.name} has been removed to the list`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        handleAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };
  return (
    <div>
      {["right"].map((anchor) => (
        <>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "gold",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  style={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    backgroundColor: "gold",
                    objectFit: "contain",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayname || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <span
                              style={{ cursor: "pointer", fontSize: 16 }}
                              onClick={() => removeFromWatchlist(coin)}
                            >
                              Delete
                            </span>
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "gold",
                  marginTop: 20,
                }}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </>
      ))}
    </div>
  );
}
