import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import useStyles from "./CoinpageStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { numberWithCommas } from "../components/Carousel";
import parse from "html-react-parser";
const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { currency, symbol } = useSelector((store) => store.crypto);
  const classes = useStyles();
  const fetchCoin = async () => {
    setIsLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return <h1>Loading</h1>;
  }
  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img src={coin.image.large} height="200" style={{ marginBottom: 20 }} />

        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          {/* Rank */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin.market_cap_rank}
            </Typography>
          </span>
          {/* current price */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          {/* market cap */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Matket Cap:
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
