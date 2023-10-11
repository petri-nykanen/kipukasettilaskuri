import { Theme, createTheme } from "@mui/material";
import "@fontsource-variable/quicksand";

export const theme: Theme = createTheme({
  typography: {
    fontFamily: "Quicksand Variable",
    fontWeightRegular: 400,
    fontSize: 15
  },
  palette: {
    primary: {
      main: "#222"
    },
    secondary: {
      main: "#f78da7"
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "default"
      },
      styleOverrides: {
        root: {
          top: "1em",
          borderRadius: 15
        }
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          height: 48,
          width: 48
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 4
      },
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5"
        }
      }
    }
  }
});
