import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useStyles from "./style";
import Logo from "../Logo";
import ProfileIcon from "./ProfileIcon";
import { useStringContext } from "../../context/StringContext";

const Navbar = (props) => {
  // AUTH CONTEXT
  const { logout, currentUser } = useAuthContext();
  const navigate = useNavigate();

  // STRING CONTEXT
  const { navbarString } = useStringContext();

  // STYLE CLASSES
  const classes = useStyles();

  //   NAVBAR STATE
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  // NAV ITEMS

  const pages = [
    { page: "Home", icon: <HomeIcon color="secondary" />, href: "/" },
    { page: "Users", icon: <GroupIcon color="secondary" />, href: "/users" },
  ];
  const accounts = [{ page: "Account Settings", icon: <SettingsIcon color="secondary" />, href: "/settings" }];

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      alert("Failed to logout of account");
      console.error(e);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar className={classes.navbarContainer}>
          <Box
            className={classes.logoContainer}
            onClick={() => {
              navigate("/");
            }}
          >
            <Logo p={1} fontSize={"16px"} iconSize={24} />
          </Box>
          <Box className={classes.navLinks}>
            {pages.map((item) => (
              <Button key={item.page} color="inherit" startIcon={item.icon} component={Link} to={item.href}>
                {item.page}
              </Button>
            ))}
          </Box>
          <Box textAlign="right">
            <ProfileIcon photoUrl={currentUser.photoUrl} accounts={accounts} handleLogout={handleLogout} />
          </Box>
          <Box className={classes.navLinksContainer}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => {
                setOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              container={container}
              variant="temporary"
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              className={classes.collapse}
            >
              <Box className={classes.collapseContainer}>
                <Logo p={1} fontSize={"16px"} iconSize={24} />
                <Divider sx={(theme) => ({ background: theme.palette.secondary.dark })} />
                <List sx={{ color: "primary.contrastText" }}>
                  <Typography className={classes.navTitle}>Navigation</Typography>
                  {pages.map((item) => (
                    <ListItem key={item.page} disablePadding>
                      <ListItemButton className={classes.navItem} component={Link} to={item.href}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.page} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Typography className={classes.navTitle}>Account</Typography>
                  {accounts.map((account) => (
                    <ListItem key={account} disablePadding>
                      <ListItemButton className={classes.navItem} component={Link} to={account.href}>
                        <ListItemIcon>{account.icon}</ListItemIcon>
                        <ListItemText primary={account.page} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton className={classes.navItem} onClick={handleLogout} component={Link}>
                      <ListItemIcon>
                        <LogoutIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
