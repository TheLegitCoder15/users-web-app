import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signInContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    formContainer: {
      padding: "24px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      borderColor: theme.palette.primary.main,
      border: "1px solid",
      maxWidth: "650px",
      gap: "10px",
      "& > *": {
        flexGrow: 1,
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "100%",
        borderRadius: "0",
        border: "unset",
      },
    },
    logoContainer: {
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    submitButton: {
      margin: `${theme.spacing(2)} 0 !important`,
      width: "80%",
      flexGrow: 0,
    },
  };
});

export default useStyles;
