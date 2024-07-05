import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    homeContainer: {
      padding: theme.spacing(3),
    },
    cardContainer: {
      maxWidth: "345px",
    },
    cardContent: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        flexGrow: "1",
        flexBasis: "10ch",
      },
    },
  };
});

export default useStyles;
