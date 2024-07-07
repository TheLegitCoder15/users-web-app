import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    settingsContainer: {
      padding: theme.spacing(2),
      "& > .MuiPaper-root": { padding: theme.spacing(2), display: "flex", flexWrap: "wrap", gap: "10px" },
    },
  };
});

export default useStyles;
