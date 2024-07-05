import { Card, Box, CardContent, Typography, CardHeader, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PrivateRoute from "../../util/PrivateRoute";
import axios from "axios";
import useStyles from "./style";

const Home = () => {
  // AUTH CONTEXT
  const { currentUser } = useAuthContext();

  // STYLES
  const classes = useStyles();

  // USERS HOOK
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // GET ALL USERS ON MOUNT
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REST_URL}/Users`, {
          headers: { Authorization: `${currentUser.accessToken}` },
        });
        setUsers([...res.data]);
      } catch (error) {
        console.error("Error Fetching Users: ", error.message);
      }
    };

    getAllUsers();
  }, [currentUser]);

  return (
    <PrivateRoute>
      <Box className={classes.homeContainer}>
        <Card className={classes.cardContainer} raised>
          <CardHeader title="USERS" titleTypographyProps={{ fontWeight: "bold", fontSize: "1.25rem" }} />
          <Divider />
          <CardContent className="classes.cardContent">
            <Typography variant="body1">No.of users: {users.length}</Typography>
          </CardContent>
        </Card>
      </Box>
    </PrivateRoute>
  );
};

export default Home;
