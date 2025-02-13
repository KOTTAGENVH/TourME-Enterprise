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
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import "../Destination/CSS/calendar.css";
import { useMemo } from "react";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { setidAction } from "../../Redux/storeid/storeidAction";
import { deleteDestinationById, deleteDestinationOrderById, getDestinationOrdersBySellerEmail } from "../../Api/services/destinationService";

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

export default function Destinationorder() {
  const settings = ["Profile", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [opendialog, setOpenDialog] = React.useState(false);
  const [id, setid] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkmodes = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getDestinationOrdersBySellerEmail(loggedUser?.email),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = (id) => {
    setid(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  let formattedSelectedDate = null;

  if (selectedDate) {
    const dateObject = new Date(selectedDate);
    formattedSelectedDate = dateObject.toLocaleDateString("en-GB");
  }

  // Apply filter function to the data if data is available
  const filteredData = data ?? []; // Providing a default value for data

  // Only filter data if the selected date is defined
  const filteredResults = selectedDate
    ? filteredData.filter((item) => {
        // Format item date to DD/MM/YYYY
        // const itemDate = item.date.split("/").reverse().join("/");
        return item?.date === formattedSelectedDate;
      })
    : filteredData;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "InvoiceNo",
        header: "Invoice No",
        size: 150,
      },
      {
        accessorKey: "productname",
        header: "Product Name",
        size: 150,
      },
      {
        accessorKey: "total",
        header: "Total Quantity",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ row }) => (
          <div>
            {row.original.status === "Booked" && (
              <Chip
                label="Booked"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            )}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <IconButton
              onClick={() => handleView(row)}
              sx={{
                margin: "5px",
                padding: "8px",
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton>

            <Button
              onClick={() => handleClickOpen(row?.original?._id)}
              sx={{
                backgroundColor: "red",
                color: handleColor(),
                borderRadius: "20px",
                margin: "5px",
                padding: "8px",
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  React.useEffect(() => {
    // Retrieve the rowsPerPage value from local storage
    const storedRowsPerPage = localStorage.getItem("rowsPerPage");
    if (storedRowsPerPage) {
      setRowsPerPage(parseInt(storedRowsPerPage));
    }
  }, []);

  // Update the rowsPerPage value in local storage when it changes
  React.useEffect(() => {
    localStorage.setItem("rowsPerPage", rowsPerPage);
  }, [rowsPerPage]);

  // Other parts of your component

  const table = useMaterialReactTable({
    columns,
    data: filteredResults,
    enableColumnActions: false,
    enablePagination: true,
    muiTableContainerProps: {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [2, 3],
    },
    initialState: { density: 'compact', pagination: { pageSize: 3, pageIndex: 0 } },
    paginationDisplayMode: 'pages',
  });

  const handleView = (row) => {
    dispatch(setidAction(row?.original?.destinationid));
    navigate("/viewOne");
  };

  const handleDelete = (status) => {
    try {
      deleteDestinationOrderById(id).then((res) => {
        toast.success("Order Deleted Successfully");
        setOpenDialog(false);
        window.location.reload();
      });
    } catch (error) {
      toast.error("Error in Cancelling Order");
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
          margin: "70px",
          padding: "20px",
          width: "80vw",
          height: "50vh",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Filter by date"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{
              color: handleColor(),
              margin: "20px",
              padding: "10px",
              fontSize: "10px",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              "& input, & label": {
                color: handleColor(),
              },
            }}
          />
        </LocalizationProvider>
        <MaterialReactTable table={table} />;
        <Dialog
          open={opendialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            Confirm to delete this order?
          </DialogTitle>
          <DialogActions
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              color: handleColor(),
            }}
          >
            <Button
              sx={{
                backgroundColor: "red",
                color: handleColor(),
                borderRadius: "20px",
                margin: "5px",
                padding: "8px",
              }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "blue",
                color: handleColor(),
                borderRadius: "20px",
                margin: "5px",
                padding: "8px",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
