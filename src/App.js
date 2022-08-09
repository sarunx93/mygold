import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/cryptoSlice";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import useStyles from "./styles";
import Alert from "./components/Alert";
import { useEffect } from "react";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { setWatchlist } from "./features/cryptoSlice";
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currency, symbol, user, watchlist } = useSelector(
    (store) => store.crypto
  );
  useEffect(() => {
    onAuthStateChanged(auth, (myUser) => {
      if (myUser) {
        dispatch(setUser(myUser));
      } else {
        dispatch(setUser(null));
      }
      console.log(myUser);
    });
  }, []);
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsybscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          dispatch(setWatchlist(coin.data().coins));
        } else {
          console.log("No item in the watchlist");
        }
      });
      return () => {
        unsybscribe();
      };
    }
  }, [user]);
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
