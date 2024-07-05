import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import { useStringContext } from "../../context/StringContext";

const Logo = ({ color, fontWeight = "bold", fontSize, iconSize = 32, ...props }) => {
  // STRING CONTEXT
  const {
    globalString: { app__title },
  } = useStringContext();
  return (
    <Box
      id="logo-container"
      width={1}
      display="flex"
      flexDirection="row"
      gap={1}
      flexGrow="0"
      sx={{ caretColor: "transparent" }}
      {...props}
    >
      <img src={logo} alt="logo" width={iconSize} height={iconSize} color="secondary.main" />
      <Typography variant="h5" paddingTop="5px" fontWeight={fontWeight} color={color} fontSize={fontSize}>
        {app__title}
      </Typography>
    </Box>
  );
};

export default Logo;
