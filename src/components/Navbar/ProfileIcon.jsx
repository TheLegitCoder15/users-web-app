import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography, ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStringContext } from "../../context/StringContext";
import React, { useState } from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";

const ProfileIcon = ({ photoUrl, accounts, handleLogout }) => {
  // NAVBAR STRING CONTEXT
  const { navbarString } = useStringContext();

  const classes = useStyles();

  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const handleOpenProfileMenu = (e) => {
    setOpenProfileMenu(e.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };

  return (
    <>
      <Tooltip title={navbarString.str__tooltip}>
        <IconButton onClick={handleOpenProfileMenu} className={classes.profileIcon}>
          <Avatar alt="User Profile Photo" src={photoUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={openProfileMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={Boolean(openProfileMenu)}
        onClose={handleCloseProfileMenu}
        className={classes.userMenu}
      >
        {accounts.map((account) => (
          <MenuItem key={account.page} onClick={handleCloseProfileMenu} component={Link} to={account.href}>
            <ListItemIcon>{account.icon}</ListItemIcon>
            <ListItemText primary={account.page} />
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;
