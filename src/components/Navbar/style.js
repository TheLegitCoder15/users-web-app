import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    navbarContainer: {
      padding: "unset !important",
    },
    logoContainer: {
      display: "flex",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    navLinks: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
      "& > .MuiButton-root": {
        alignItems: "stretch",
      },
      gap: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    navLinksContainer: {
      display: "none",
      flexGrow: "0",

      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    collapse: {
      display: "none",

      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    collapseContainer: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      height: "100%",
      width: "100%",
    },
    navTitle: {
      fontWeight: "bold !important",
    },
    profileIcon: {
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
    userMenu: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      },
    },
  };
});

export default useStyles;
