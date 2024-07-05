import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  // Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import initialLoginFields from "../../util/initialLoginFields";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";
import WelcomeMessage from "./WelcomeMessage";
import Logo from "../Logo";
import { useStringContext } from "../../context/StringContext";

const Login = () => {
  // AUTH CONTEXT & REACT ROUTER NAVIGATE
  const { signIn, currentUser } = useAuthContext();
  const navigate = useNavigate();

  // STRING CONTEXT
  const {
    globalString: { email__label, password__label },
    signInString: { str__signIn, str__login, str__register__button, str__register__label },
  } = useStringContext();

  // LOGIN FIELDS HOOK
  const [fields, setFields] = useState(initialLoginFields);
  const { email, password } = fields;
  // SHOW PASSWORD HOOK
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (currentUser) {
      navigate("/");
    }

    try {
      signIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignContent="stretch"
      height={1}
      sx={{ backgroundColor: "primary.main" }}
    >
      <WelcomeMessage />
      <Box
        id="login-container"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          backgroundColor: "background.default",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        width={0.5}
        padding={3}
        flexBasis="10px"
        flexGrow="1"
      >
        <Logo />
        <Box
          component="form"
          id="form-container"
          onSubmit={handleLogin}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignContent="center"
          flexGrow="1"
          gap="32px"
        >
          <Typography variant="h4" textTransform="uppercase" fontWeight="600" width={1} color="primary.main">
            {str__signIn}
          </Typography>
          <TextField
            type="email"
            id="email"
            name="email"
            label={email__label}
            variant="outlined"
            value={email}
            onChange={(e) => {
              setFields({ ...fields, email: e.target.value });
            }}
            autoComplete="username"
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                    color="primary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={password__label}
              value={password}
              onChange={(e) => {
                setFields({ ...fields, password: e.target.value });
              }}
              autoComplete="new-password"
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "80%",
              marginTop: 2,
            }}
          >
            <Typography variant="button">{str__login}</Typography>
          </Button>
          <Typography variant="body1" color="text.primary">
            {str__register__label}
            <Link to="/sign-up" style={{ width: "100%", textAlign: "center" }}>
              {str__register__button}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
