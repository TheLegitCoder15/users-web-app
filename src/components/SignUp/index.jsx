import "./index.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Paper,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import initialField from "../../util/initialField";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStringContext } from "../../context/StringContext";
import Logo from "../Logo";
import useStyles from "./style";
import { useFirestoreContext } from "../../context/FirestoreContext";

const SignUp = () => {
  // CONTEXT
  const { currentUser, signUp } = useAuthContext();
  const { globalString, signUpString } = useStringContext();
  const { FIRESTORE_ADD } = useFirestoreContext();

  const classes = useStyles();

  // REACT ROUTER NAVIGATE
  const navigate = useNavigate();

  // FIELDS HOOK
  const [fields, setFields] = useState(initialField);
  const { firstName, lastName, email, password, confirmPassword } = fields;

  // SHOW PASSWORD HOOK
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ERRORS HOOK
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(globalString.error__empty__field);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // LOADING HOOK
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    // HANDLE REGISTRATION
    e.preventDefault();

    // CHECK IF FIELDS ARE FILLED
    if (!firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    if (!lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    if (!email) {
      setEmailError(true);
      setEmailErrorText(globalString.error__empty__field);
    } else {
      // CHECK EMAIL PATTERN
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        setEmailError(true);
        setEmailErrorText(globalString.error__invalid__email);
      } else {
        setEmailError(false);
      }
    }

    // CHECK IF PASSWORD SATISFY REQUIREMENTS AND IF MATCHED
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    // REGISTRATION CODE
    try {
      setLoading(true);

      // Sign up with Firebase Auth
      const newUser = await signUp(email, password);

      // Data to send to server
      const data = {
        firstName,
        lastName,
        email,
        password,
        uid: newUser.user.uid,
      };

      // Add new user data to firestore
      await FIRESTORE_ADD(data);

      // Navigate to homepage
      navigate("/");
    } catch (e) {
      alert("Failed to register");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box className={classes.signInContainer}>
      <Paper
        component="form"
        className={classes.formContainer}
        onSubmit={handleSignUp}
        noValidate
        elevation={5}
        square={false}
      >
        <Box className={classes.logoContainer}>
          <Logo />
        </Box>
        <Typography
          variant="h2"
          textTransform="uppercase"
          fontWeight="700"
          color="primary"
          width={1}
          textAlign="center"
        >
          {signUpString.str__signUp}
        </Typography>
        <TextField
          id={globalString.fname__prop}
          name={globalString.fname__prop}
          label={globalString.fname__label}
          variant="outlined"
          value={firstName}
          onChange={(e) => {
            setFields({ ...fields, firstName: e.target.value });
          }}
          error={firstNameError}
          helperText={firstNameError ? globalString.error__empty__field : ""}
        />
        <TextField
          id={globalString.lname__prop}
          name={globalString.lname__prop}
          label={globalString.lname__label}
          variant="outlined"
          value={lastName}
          onChange={(e) => {
            setFields({ ...fields, lastName: e.target.value });
          }}
          error={lastNameError}
          helperText={lastNameError ? globalString.error__empty__field : ""}
        />
        <TextField
          type="email"
          id={globalString.email__prop}
          name={globalString.email__prop}
          label={globalString.email__label}
          variant="outlined"
          value={email}
          onChange={(e) => {
            setFields({ ...fields, email: e.target.value });
          }}
          autoComplete="username"
          error={emailError}
          helperText={emailError ? emailErrorText : ""}
          fullWidth
        />
        <FormControl variant="outlined" error={passwordError} fullWidth>
          <InputLabel htmlFor={globalString.password__prop}>Password</InputLabel>
          <OutlinedInput
            id={globalString.password__prop}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  color="primary"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={globalString.password__label}
            value={password}
            onChange={(e) => {
              setFields({ ...fields, password: e.target.value });
            }}
            autoComplete="new-password"
            error={passwordError}
          />
          {passwordError && <FormHelperText>{globalString.error__password__pattern}</FormHelperText>}
        </FormControl>

        <FormControl variant="outlined" error={confirmPasswordError} fullWidth>
          <InputLabel htmlFor={globalString.confirmpassword__prop}>Confirm Password</InputLabel>
          <OutlinedInput
            id={globalString.confirmpassword__prop}
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                  color="primary"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={globalString.confirmpassword__label}
            value={confirmPassword}
            onChange={(e) => {
              setFields({ ...fields, confirmPassword: e.target.value });
            }}
            autoComplete="new-password"
            error={confirmPasswordError}
          />
          {confirmPasswordError && <FormHelperText>{globalString.error__password__mismatch}</FormHelperText>}
        </FormControl>

        <Button className={classes.submitButton} type="submit" variant="contained">
          <Typography variant="button">{globalString.submit__button}</Typography>
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUp;
