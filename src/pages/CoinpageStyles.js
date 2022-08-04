import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({});
export default makeStyles(() => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));
