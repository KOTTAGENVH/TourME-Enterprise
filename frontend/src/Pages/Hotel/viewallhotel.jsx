import * as React from "react";
import { styled, createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ToastContainer } from "react-toastify";
import MainListItems from "./Components/listItems";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { setdarkmode } from "../../Redux/darkmode/darkmodeAction";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../Redux/auth/authAction";
import { useNavigate } from "react-router-dom";
import { getDestinationByEmail } from "../../Api/services/destinationService";
import Hotelbox from "./Components/hotelbox";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { getAllHotelsbyemail } from "../../Api/services/hotelService";

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

function ViewAllHotels() {
  const settings = ["Profile", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [showClearIcon, setShowClearIcon] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setShowClearIcon(value !== "");
  };

  const handleClearClick = () => {
    setSearchText("");
    setShowClearIcon(false);
  };

  const handleColor = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllHotelsbyemail(loggedUser?.email),
  });

  // Filtering destinations based on the search text
  const filteredDestinations = data?.length > 0 ? data.filter(
    (hotel) =>
      hotel?.title?.toLowerCase().includes(searchText?.toLowerCase()) ||
      hotel?.category?.toLowerCase().includes(searchText?.toLowerCase())
  ) : [];


  return (
    <Box sx={{ display: "flex" }}>
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
            Hotel Management
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

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

      {data !== undefined && data.length !== 0 ? (
        <div>
          <TextField
            required
            id="standard-required"
            defaultValue="Search"
            endAdornmentIcon={<SearchIcon />}
            variant="standard"
            value={searchText}
            onChange={handleInputChange}
            sx={{
              marginTop: "80px",
              marginLeft: "50%",
              width: "30vw",
              height: "50px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              justifySelf: "center",
              borderRadius: "20px",
              input: { color: handleColor(), width: "27vw" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showClearIcon ? (
                    <SearchOffIcon onClick={handleClearClick} />
                  ) : (
                    <SearchIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              marginLeft: "30px",
            }}
          >
            {filteredDestinations?.map((destination) => (
              <Hotelbox
                _id={destination._id}
                title={destination.title}
                category={destination.category}
                maindescription={destination.maindescription}
                description={destination.description}
                image={destination.image}
                image1={destination.image1}
                VirtualVideo={destination.VirtualVideo}
                price={destination.price}
                NoRooms={destination.NoRooms}
                Address={destination.Address}
                Address1={destination.Address1}
                rating={destination.rating}
                location={destination.location}
                username={destination.username}
                useremail={destination.useremail}
                usertel={destination.usertel}
              />
            ))}
          </div>
        </div>
      ) : (
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            fontSize: "50px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginLeft: "20%",
            marginRight: "20%",
            color: handleColor(),
            width: "100%",
          }}
        >
          Sorry No Hotels Available!
        </Typography>
      )}
    </Box>
  );
}

export default ViewAllHotels;
