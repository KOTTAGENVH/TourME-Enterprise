import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getDestinationById } from "../../Api/services/destinationService";
import { styled, createTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
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
import Iframe from "react-iframe";
import Rating from "@mui/material/Rating";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://tour-me-frontend.vercel.app/">
        TourME(WEB)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const defaultTheme = createTheme();

function ViewOneDestination() {
  const settings = ["Profile", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);

  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const idState = useSelector((state) => state.id.id);

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

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleColor = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getDestinationById(idState),
  });

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
        ModalProps={{ disableScrollLock: true }}
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
        <div
          style={{
            marginTop: "80px",
            marginLeft: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: handleColor(),
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              width: "80vw",
              height: "85vh",
              margin: "20px",
              overflowX: "auto",
            }}
          >
            <Button
              sx={{
                margin: "20px",
                justifyContent: "left",
                alignContent: "left",
                alignSelf: "left",
                fontSize: "20px",
              }}
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/viewall");
              }}
            >
              Back
            </Button>
            <Typography
              variant="h4"
              sx={{
                color: handleColor(),
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                margin: "20px",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {data.title}
            </Typography>
            <MDBCarousel
              showIndicators
              showControls
              fade
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                margin: "20px",
                width: "70vw",
                height: "400px",
                borderRadius: "20px",
                marginBottom: "40px",
              }}
            >
              <MDBCarouselItem
                itemId={1}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  margin: "20px",
                  width: "70vw",
                  height: "400px",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={data.image}
                  className="d-block w-100"
                  alt="..."
                  style={{
                    borderRadius: "20px",
                  }}
                />
              </MDBCarouselItem>

              <MDBCarouselItem
                itemId={2}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  margin: "20px",
                  width: "70vw",
                  height: "400px",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={data.image1}
                  className="d-block w-100"
                  alt="..."
                  style={{
                    borderRadius: "20px",
                  }}
                />
              </MDBCarouselItem>
            </MDBCarousel>
            <Rating
              sx={{
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                margin: "20px",
                width: "400px",
                height: "80px",
              }}
              name="read-only"
              value={data.rating}
              readOnly
            />
            <Typography
              variant="h6"
              sx={{
                margin: "20px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              Ticket Price: Rs. {data.price}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: "20px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              No Tickets Avaialable: {data.NoTickets}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: "20px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              {data.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                margin: "15px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              Email : {data.useremail}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: "15px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              Phone : {data.usertel}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: "15px",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: "30px",
              }}
            >
              Address : {data.Address}, {data.Address1}
            </Typography>
            <Iframe
              id="myId"
              src={data.location}
              width="90%"
              height="195vh"
              styles={{
                borderRadius: "20px",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                margin: "20px",
              }}
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Box>
        </div>
      ) : (
        <Typography
          component="div"
          style={{
            margin: "10%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            fontSize: "50px",
            color: handleColor(),
          }}
        >
          Sorry the page requested is not available!
        </Typography>
      )}
    </Box>
  );
}

export default ViewOneDestination;
