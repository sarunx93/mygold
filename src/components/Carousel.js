import React, { useEffect, useState } from "react";
import useStyles from "./CarouselStyles";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { useSelector, useDispatch } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const classes = useStyles();
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency, symbol } = useSelector((store) => store.crypto);
  const responsive = {
    0: {
      item: 2,
    },
    512: {
      item: 4,
    },
  };

  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin.symbol} &nbsp;
          <span
            style={{
              color: profit > 0 ? "gold" : "red",
            }}
          >
            {profit && "+"} {coin.price_change_percentage_24h}
          </span>
        </span>
        <br></br>
        <span>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
        disableDotsControls
      />
    </div>
  );
};

export default Carousel;
