import { createTheme } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#243e36",
    },
    secondary: {
      main: "#20fc8f",
    },
    error: {
      main: "#ff0000",
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    fontFamily: "Comfortaa Variable, Roboto; sans-serif",
    button: {
      fontWeight: "bold",
      fontSize: "0.925rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          caretColor: "transparent",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 1536px)": {
            margin: 0,
            maxWidth: "unset",
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "secondary",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "2.25rem",
          height: "2.25rem",
        },
      },
    },
  },
});

export default themeOptions;
