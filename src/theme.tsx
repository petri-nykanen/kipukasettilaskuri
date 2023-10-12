import { Theme, createTheme } from "@mui/material";
import "@fontsource-variable/quicksand";

export const theme: Theme = createTheme({
  typography: {
    fontFamily: "Quicksand Variable",
    fontWeightRegular: 500,
    fontSize: 16
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {}
      }
    }
  }
});
