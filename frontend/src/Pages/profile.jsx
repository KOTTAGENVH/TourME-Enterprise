import React from "react";
import { ToastContainer } from "react-toastify";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MainListItems from "./Destination/Components/listItems";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { setdarkmode } from "../Redux/darkmode/darkmodeAction";
import { useDispatch } from "react-redux";
import { signOutAction } from "../Redux/auth/authAction";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Profile() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const [open, setOpen] = React.useState(true);
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    dispatch(setdarkmode(!darkMode));
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      dispatch(signOutAction());
      navigate("/");
      handleCloseUserMenu();
    } else if (setting === "Profile") {
      navigate("/profile");
    } else {
      handleCloseUserMenu();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.5)",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <ToastContainer />
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(60px)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Destination Management
          </Typography>
          <FormGroup
            sx={{
              marginLeft: "60%",
              justifyContent: "flex-end",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  color="primary"
                  icon={<Brightness5Icon />}
                  checkedIcon={<Brightness3Icon />}
                />
              }
            />
          </FormGroup>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                marginLeft: "auto",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            height: "100vh",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "20px",
          margin: "60px auto",
          maxWidth: "350px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          height: "fit-content",
          marginTop: "100px",
        }}
      >
        <Avatar
          alt={loggedUser?.username}
          src={loggedUser?.avatar}
          sx={{
            width: 200,
            height: 200,
            margin: "auto",
            marginBottom: "20px",
          }}
        />
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          Username: {loggedUser?.username}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          Email: {loggedUser?.email}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          System Role: {loggedUser?.role}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          Secret Code: {loggedUser?.secretcode}
        </Typography>
      </Box>
    </Box>
  );
}

export default Profile;
