import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { setdarkmode } from "../../Redux/darkmode/darkmodeAction";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../Redux/auth/authAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getDestinationOrdersBySellerEmail } from "../../Api/services/destinationService";
import "../Destination/CSS/calendar.css";
import { useMemo } from "react";
import Chart from "chart.js/auto";
import { useRef } from "react";

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

export default function Dashboard() {
  const settings = ["Profile", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(20);

  const chartRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const darkmodes = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getDestinationOrdersBySellerEmail(loggedUser?.email),
  });

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
    if (darkmodes) {
      return "white";
    } else {
      return "black";
    }
  };

  React.useEffect(() => {
    const box = document.getElementById("myBox");
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    const idealFontSize = Math.min(boxWidth / 25, boxHeight / 15);

    setFontSize(idealFontSize);
  }, []);

  const events = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
      title: item.InvoiceNo,
      start: moment(item.date, "DD/MM/YYYY").toDate(),
      end: moment(item.date, "DD/MM/YYYY").toDate(),
    }));
  }, [data]);

  const CustomAgenda = ({ events }) => {
    return (
      <div className="rbc-agenda-table">
        <table>
          <thead>
            <tr>
              <th className="rbc-header" style={{ width: "50%" }}>
                Invoice No
              </th>
              <th className="rbc-header" style={{ width: "50%" }}>
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="rbc-agenda-cell">{event.title}</td>
                <td className="rbc-agenda-cell">
                  {moment(event.start).format("LT")} -{" "}
                  {moment(event.end).format("LT")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getOrderCountByMonth = (month) => {
    if (!data || !Array.isArray(data)) return 0;

    return data.filter(
      (item) => moment(item.date, "DD/MM/YYYY").month() === month
    ).length;
  };

  // Calculate order counts for each month
  const orderCounts = Array.from({ length: 12 }, (_, i) =>
    getOrderCountByMonth(i)
  );

  React.useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Order Count by Month",
            data: orderCounts,
            backgroundColor: [
              "red",
              "blue",
              "green",
              "orange",
              "purple",
              "pink",
              "cyan",
              "magenta",
              "yellow",
              "brown",
              "lightblue",
              "lightgreen",
            ],
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [orderCounts]);

  return (
    <Box sx={{ display: "flex" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Box
            id="myBox"
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 10px )",
              borderRadius: "10px",
              width: "30vw",
              height: "30vh",
              marginLeft: "50px",
              marginTop: "100px",
              color: handleColor(),
              fontSize: `${fontSize}px`, // Set the font size dynamically
              padding: "20px",
              overflowWrap: "break-word", // To allow long words to wrap
            }}
          >
            This is a small project done by me(Nowen Kottage) using the MERN
            stack, Redux, Rapid Api. The main motive of this project is to give
            the user a platform where they can find details of Sri - Lanka and
            also book hotels, destinations and purchase souvenirs.Pls note that this is a DEMO. Note:
            Images and text were taken from the internet.
          </Box>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "30vw",
                marginLeft: "50px",
                marginTop: "20px",
                color: handleColor(),
                fontSize: "20px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Calendar
              className={darkmodes ? "dark-calendar" : "light-calendar"}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: "50vh",
                width: 600,
                marginLeft: "50px",
                marginTop: "20px",
                color: handleColor(),
                fontSize: "20px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
              }}
              components={{
                agenda: {
                  event: () => <CustomAgenda events={events} />,
                },
              }}
            />
          )}
        </div>
        <div
        style={{
          width: "40vw",
          height : "40vw",
          marginLeft: "100px",
          marginTop: "160px",
          background: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(10px)", 
          borderRadius: "20px", 
          padding: "20px",
          color: handleColor(),
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        >
          <canvas ref={chartRef} />
        </div>
      </div>
    </Box>
  );
}
