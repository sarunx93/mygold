import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import useStyles from "./CoinpageStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useSelector((store) => store.crypto);
  const classes = useStyles();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className={classes.container}>
      {/* sidebar */}
      <h1>sidebar</h1>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
