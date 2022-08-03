import { Container, Typography } from "@mui/material";
import React from "react";
import useStyles from "./BannerStyles";
import Carousel from "./Carousel";
const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Crypto Hunter
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
