import { Box, Typography } from "@mui/material";
import { useStringContext } from "../../context/StringContext";
import "./WelcomeMessage.css";

const WelcomeMessage = () => {
  // STRING CONTEXT
  const {
    signInString: {
      str__welcome,
      str__welcome__1,
      str__welcome__2,
      str__author__label,
      str__author,
      str__author__email,
      str__email__label,
    },
  } = useStringContext();

  return (
    <Box
      id="welcome-container"
      color="primary.contrastText"
      padding={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flexWrap="wrap"
      alignContent="center"
      alignItems="center"
      gap={1}
      flexBasis="10px"
      flexGrow="2"
    >
      <Typography variant="h1" color="secondary.main" fontWeight="700">
        {str__welcome}
      </Typography>
      <Box>
        <Typography variant="h6">{str__welcome__1}</Typography>
        <Typography variant="h6">{str__welcome__2}</Typography>
      </Box>
      <Box>
        <Typography variant="body1" marginTop={3}>
          {str__author__label}
          {str__author}
        </Typography>
        <Typography variant="body1">
          {str__email__label}
          {str__author__email}
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeMessage;
