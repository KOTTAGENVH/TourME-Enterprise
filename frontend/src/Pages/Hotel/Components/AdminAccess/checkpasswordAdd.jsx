import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setdarkmode } from "../../../../Redux/darkmode/darkmodeAction";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { signOutAction } from "../../../../Redux/auth/authAction";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Checkpassword() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [password, setPassword] = useState("");
  const { pass } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    dispatch(setdarkmode(!darkMode));
  };

  const settings = ["Profile", "Logout"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

  const handleAdminAccessCheck = () => {
    try {
      if (password === "admin@123") {
        toast.success("Admin Access Granted");
        setPassword("");
        if (pass === "add") {
          navigate("/addDestination");
        }else if (pass === "update") {
          navigate("/update");
        }
      } else {
        toast.error("Admin Access Denied");
        setPassword("");
      }
    } catch (error) {
      toast.error("Admin Access Denied");
      setPassword("");
    }
  };

  return (
    <div>
      <AppBar
        position="absolute"
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Admin Access
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
      <ToastContainer />
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          color: "black",
          margin: "20vh auto",
          padding: "20px",
          height: "30vh",
          width: "50vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" textAlign="center" sx={{ color: "black" }}>
          Admin Access
        </Typography>
        <TextField
          id="standard-basic"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
          variant="standard"
          sx={{
            textAlign: "center",
            justifyContent: "center",
            marginTop: "4vh",
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "4vh",
            width: "10vw",
            height: "5vh",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          onClick={() => handleAdminAccessCheck()}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Checkpassword;
