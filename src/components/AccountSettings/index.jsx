import React, { useEffect, useState } from "react";
import PrivateRoute from "../../util/PrivateRoute";
import { Box, Paper, TextField } from "@mui/material";
import useStyles from "./style";
import { useStringContext } from "../../context/StringContext";
import { useAuthContext } from "../../context/AuthContext";

const index = () => {
  const classes = useStyles();
  const { globalString } = useStringContext();
  const { currentUser } = useAuthContext();

  const [firstName, lastName] = currentUser.displayName?.split(" ") || "";
  return (
    <PrivateRoute>
      <Box className={classes.settingsContainer}>
        <Paper elevation={2}>
          <TextField
            variant="outlined"
            name={globalString.fname__prop}
            value={firstName || ""}
            label={globalString.fname__label}
            fullWidth
          />
          <TextField
            variant="outlined"
            name={globalString.lname__prop}
            value={lastName || ""}
            label={globalString.lname__label}
            fullWidth
          />
          <TextField
            type="email"
            id={globalString.email__prop}
            name={globalString.email__prop}
            label={globalString.email__label}
            variant="outlined"
            value={currentUser.email}
            onChange={(e) => {
              setFields({ ...fields, email: e.target.value });
            }}
            autoComplete="username"
            // error={emailError}
            // helperText={emailError ? emailErrorText : ""}
            fullWidth
          />
        </Paper>
      </Box>
    </PrivateRoute>
  );
};

export default index;
