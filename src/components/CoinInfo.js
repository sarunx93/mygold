import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { useSelector } from "react-redux";
// import useStyles from "./CoinInfoStyles";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { chartDays } from "../config/buttonData";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import SelectButton from "./SelectButton";
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();

  const [days, setDays] = useState(1);
  const { currency, symbol } = useSelector((store) => store.crypto);
  const customTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const Container = styled("div")(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,

    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
  }, [days]);
  if (!historicalData) {
    return <h1>Loading...</h1>;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;
