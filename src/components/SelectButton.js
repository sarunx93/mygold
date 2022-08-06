import React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import useStyles from "./SelectButtonStyles";
const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles(selected);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
