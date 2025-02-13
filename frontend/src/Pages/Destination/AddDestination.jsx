import * as React from "react";
import { styled} from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MuiFileInput } from "mui-file-input";
import MainListItems from "./Components/listItems";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { addDestination } from "../../Api/services/destinationService";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import CircularProgress from "@mui/material/CircularProgress";
import { setdarkmode } from "../../Redux/darkmode/darkmodeAction";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../Redux/auth/authAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import Iframe from "react-iframe";
import GoogleMapImage1 from "../../Resources/GoogleMap1.png";
import GoogleMapImage2 from "../../Resources/GoogleMap2.png";
import GoogleMapImage3 from "../../Resources/GoogleMap3.png";
import GoogleMapImage4 from "../../Resources/GoogleMap4.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Api/firebase";
import { useState } from "react";
import * as Yup from "yup";

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

export default function AddDestination() {
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [image1, setImage1] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [googlemap, setGooglemap] = React.useState(null);
  const [openmodal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [title, setTitle] = useState("");
  const [maindescription, setMaindescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [NoTickets, setNoTickets] = useState("");
  const [Address, setAddress] = useState("");
  const [Address1, setAddress1] = useState("");
  const [tel, setTel] = useState("");
  const [titleerror, setTitleerror] = useState("");
  const [maindescriptionerror, setMaindescriptionerror] = useState("");
  const [descriptionerror, setDescriptionerror] = useState("");
  const [priceerror, setPriceerror] = useState("");
  const [NoTicketserror, setNoTicketserror] = useState("");
  const [Addresserror, setAddresserror] = useState("");
  const [Address1error, setAddress1error] = useState("");
  const [image1error, setImage1error] = useState("");
  const [image2error, setImage2error] = useState("");
  const [googlemaperror, setGooglemaperror] = useState("");
  const [telerror, setTelerror] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleColor = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
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

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue < 0) {
      event.target.value = 0;
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Destination Name is required"),
    maindescription: Yup.string()
      .max(100, "Main Description must be at most 100 characters")
      .trim()
      .required("Main Description is required"),
    description: Yup.string()
      .max(400, "Description must be at most 400 characters")
      .trim()
      .required("Description is required"),
    image1: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File size is too large. Maximum size is 5MB.",
        (value) => value && value.size <= 5000000
      )
      .test(
        "fileType",
        "Unsupported file type. Please upload an image.",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    image2: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File size is too large. Maximum size is 5MB.",
        (value) => value && value.size <= 5000000
      )
      .test(
        "fileType",
        "Unsupported file type. Please upload an image.",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than 0"),
    NoTickets: Yup.number()
      .required("Number of Tickets is required")
      .integer("Number of Tickets must be an integer"),
    Address: Yup.string().trim().required("Address is required"),
    Address1: Yup.string().trim().required("Address is required"),
    googlemap: Yup.string().trim().required("Location is required"),
    tel: Yup.string().trim().required("Telephone is required"),
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleerror("");
  };

  const handleMaindescriptionChange = (e) => {
    setMaindescription(e.target.value);
    setMaindescriptionerror("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionerror("");
  };

  const handleImage1Change = (e) => {
    setImage1(e);
    setImage1error("");
  };

  const handleImage2Change = (e) => {
    setImage2(e);
    setImage2error("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceerror("");
  };

  const handleNoTicketsChange = (e) => {
    setNoTickets(e.target.value);
    setNoTicketserror("");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddresserror("");
  };

  const handleAddress1Change = (e) => {
    setAddress1(e.target.value);
    setAddress1error("");
  };

  const handleGooglemapChange = (e) => {
    setGooglemap(e.target.value);
    setGooglemaperror("");
  };

  const handleTelChange = (e) => {
    setTel(e);
    setTelerror("");
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      // Validate the form data
      await validationSchema.validate(
        {
          title,
          maindescription,
          description,
          image1,
          image2,
          price,
          NoTickets,
          Address,
          Address1,
          googlemap,
          tel,
        },
        { abortEarly: false }
      );

      let url1 = "";
      let url2 = "";

      if (image1 !== null && image2 !== null) {
        const storage1Ref = ref(storage, image1?.name);
        const storage2Ref = ref(storage, image2?.name);

        const uploadTask1 = await uploadBytes(storage1Ref, image1);
        url1 = await getDownloadURL(uploadTask1.ref);

        const uploadTask2 = await uploadBytes(storage2Ref, image2);
        url2 = await getDownloadURL(uploadTask2.ref);
      }

      console.log("url1", url1);
      console.log("url2", url2);

      await addDestination(
        title,
        maindescription,
        description,
        url1,
        url2,
        price,
        NoTickets,
        Address,
        Address1,
        googlemap,
        loggedUser?.username,
        loggedUser?.email,
        tel
      );

      toast.success("Destination Added Successfully");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error Adding Destination", error);
      toast.error("Error Adding Destination");

      if (error.name === "ValidationError") {
        error.inner.forEach((e) => {
          switch (e.path) {
            case "title":
              setTitleerror(e.message);
              break;
            case "maindescription":
              setMaindescriptionerror(e.message);
              break;
            case "description":
              setDescriptionerror(e.message);
              break;
            case "image1":
              setImage1error(e.message);
              break;
            case "image2":
              setImage2error(e.message);
              break;
            case "price":
              setPriceerror(e.message);
              break;
            case "NoTickets":
              setNoTicketserror(e.message);
              break;
            case "Address":
              setAddresserror(e.message);
              break;
            case "Address1":
              setAddress1error(e.message);
              break;
            case "googlemap":
              setGooglemaperror(e.message);
              break;
            default:
              break;
          }
        });
      }
    }
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
        sx={{
          maxHeight: "80vh",
          margin: "10vh",
          padding: "20px",
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          marginBottom: "20px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <ToastContainer />
        <div style={{ flex: 1 }}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ color: handleColor() }}
          >
            Add Destination
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "5vh" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Destination Name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => {
                  handleTitleChange(e);
                }}
                helperText={titleerror}
                error={false}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Main Description (Only 100 Characters)"
                variant="outlined"
                fullWidth
                value={maindescription}
                onChange={(e) => {
                  handleMaindescriptionChange(e);
                }}
                helperText={maindescriptionerror}
                error={false}
                inputProps={{
                  maxLength: 100,
                }}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                label="Description "
                variant="outlined"
                multiline
                fullWidth
                value={description}
                onChange={(e) => {
                  handleDescriptionChange(e);
                }}
                helperText={descriptionerror}
                rows={5}
                inputProps={{
                  maxLength: 400,
                }}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiFileInput
                sx={{ height: "8vh" }}
                fullWidth
                value={image1}
                label="Upload your image"
                onChange={(e) => {
                  handleImage1Change(e);
                }}
                helperText={image1error}
                error={false}
                InputProps={{
                  inputProps: {
                    accept: "image/*",
                  },
                  endAdornment: <AttachFileIcon />,
                }}
              />
              <MuiFileInput
                sx={{ height: "8vh" }}
                fullWidth
                error={false}
                label="Upload your image"
                value={image2}
                helperText={image2error}
                onChange={(e) => {
                  handleImage2Change(e);
                }}
                InputProps={{
                  inputProps: {
                    accept: "image/*",
                  },
                  endAdornment: <AttachFileIcon />,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Price "
                variant="outlined"
                value={price}
                onChange={(e) => {
                  handlePriceChange(e);
                }}
                error={false}
                helperText={priceerror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{
                  maxLength: 400,
                  type: "number",
                  onInput: handleInputChange,
                }}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="No of Tickets "
                variant="outlined"
                value={NoTickets}
                onChange={(e) => {
                  handleNoTicketsChange(e);
                }}
                error={false}
                helperText={NoTicketserror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{
                  maxLength: 400,
                  type: "number",
                  onInput: handleInputChange,
                }}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic-multiline"
                label="Address 2(City, State, Country, Pincode)"
                variant="outlined"
                value={Address1}
                onChange={(e) => {
                  handleAddress1Change(e);
                }}
                helperText={Address1error}
                error={false}
                fullWidth
                multiline
                rows={2}
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Address 1(House No, Street Name)"
                variant="outlined"
                value={Address}
                onChange={(e) => {
                  handleAddressChange(e);
                }}
                helperText={Addresserror}
                error={false}
                fullWidth
                InputProps={{
                  sx: {
                    color: handleColor(),
                    fontSize: "20px",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Add Google Map Link (use embeded map)"
                  variant="outlined"
                  value={googlemap}
                  helperText={googlemaperror}
                  sx={{
                    marginBottom: "2vh",
                  }}
                  onChange={(e) => {
                    handleGooglemapChange(e);
                  }}
                  error={false}
                  InputProps={{
                    sx: {
                      color: handleColor(),
                      fontSize: "20px",
                      borderRadius: "20px",
                    },
                  }}
                />
                <MuiTelInput
                  value={tel}
                  onChange={(e) => {
                    handleTelChange(e);
                  }}
                  style={{
                    color: handleColor(),
                  }}
                  label="Telephone"
                  helperText={telerror}
                />
              </div>
              <Button
                variant="contained"
                sx={{
                  width: "17vw",
                  height: "3vh",
                  marginLeft: "10vw",
                  marginRight: "auto",
                  justifyContent: "right",
                  alignItems: "right",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "20px",
                }}
                onClick={() => handleOpen()}
              >
                Check how to add google map
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Iframe
                id="myId"
                src={googlemap}
                width="350vw"
                height="200vh"
                styles={{ borderRadius: "20px" }}
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                justifyContent: "right",
                display: "flex",
                alignItems: "right",
              }}
            >
              {loading ? (
                <CircularProgress variant="determinate" value={progress} />
              ) : (
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
                  }}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Box>
      <Modal
        open={openmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Carousel>
            <Typography variant="h5" textAlign="center">
              Step 1 : Follow this link{" "}
              <Link
                href="https://www.embed-map.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.embed-map.com
              </Link>
            </Typography>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 2 : Enter Location{" "}
                <Link
                  href="https://www.embed-map.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img
                src={GoogleMapImage1}
                alt="2"
                border="0"
                width="100%"
                height="100%"
              />
            </div>

            <div>
              <Typography variant="h6" textAlign="center">
                Step 3 : Enter Click Generate HTML code{" "}
                <Link
                  href="https://www.embed-map.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img
                src={GoogleMapImage2}
                alt="2"
                border="0"
                width="100%"
                height="100%"
              />
            </div>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 4 : Copy only url inside the iframe tag near src{" "}
                <Link
                  href="https://www.embed-map.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img
                src={GoogleMapImage3}
                alt="2"
                border="0"
                width="100%"
                height="100%"
              />
            </div>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 5 :Paste in the textfield and check if the map would appear
                in a small window to the left{" "}
                <Link
                  href="https://www.embed-map.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img
                src={GoogleMapImage4}
                alt="2"
                border="0"
                width="100%"
                height="100%"
              />
            </div>
          </Carousel>
        </Box>
      </Modal>
    </Box>
  );
}
