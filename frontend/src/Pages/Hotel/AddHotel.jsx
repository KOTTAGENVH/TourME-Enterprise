import * as React from "react";
import { styled } from "@mui/material/styles";
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
import MainListItems from "./Components/listItems";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
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
import { useState } from "react";
import * as Yup from "yup";
import { addHotel } from "../../Api/services/hotelService";

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

export default function AddHotel() {
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  // Use URL strings instead of file objects
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [googlemap, setGooglemap] = React.useState("");
  const [openmodal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [VirtualVideo, setVirtualVideo] = useState("");
  const [maindescription, setMaindescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [NoRooms, setNoRooms] = useState("");
  const [Address, setAddress] = useState("");
  const [Address1, setAddress1] = useState("");
  const [tel, setTel] = useState("");
  const [titleerror, setTitleerror] = useState("");
  const [maindescriptionerror, setMaindescriptionerror] = useState("");
  const [descriptionerror, setDescriptionerror] = useState("");
  const [priceerror, setPriceerror] = useState("");
  const [VirtualVideoerror, setVirtualVideoerror] = useState("");
  const [noroomserror, setNoRoomserror] = useState("");
  const [categoryerror, setCategoryerror] = useState("");
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

  const darkmodeState = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleColor = () => (darkMode ? "white" : "black");

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
    } else if (setting === "Profile") {
      navigate("/profile");
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

  // Updated validation schema for URL inputs instead of files
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Hotel Name is required"),
    category: Yup.string().trim().required("Category is required"),
    maindescription: Yup.string()
      .max(100, "Main Description must be at most 100 characters")
      .trim()
      .required("Main Description is required"),
    description: Yup.string()
      .max(400, "Description must be at most 400 characters")
      .trim()
      .required("Description is required"),
    image1: Yup.string()
      .trim()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    image2: Yup.string()
      .trim()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    VirtualVideo: Yup.string()
      .trim()
      .url("Must be a valid URL")
      .required("Virtual Video URL is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than 0"),
    NoRooms: Yup.number()
      .required("Number of Rooms is required")
      .integer("Number of Rooms must be an integer"),
    Address: Yup.string().trim().required("Address is required"),
    Address1: Yup.string().trim().required("Address is required"),
    googlemap: Yup.string()
      .trim()
      .url("Must be a valid URL")
      .required("Location is required"),
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

  // For URL inputs, update state from the text field
  const handleImage1Change = (e) => {
    setImage1(e.target.value);
    setImage1error("");
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.value);
    setImage2error("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceerror("");
  };

  const handleNoRoomsChange = (e) => {
    setNoRooms(e.target.value);
    setNoRoomserror("");
  };

  const handleVirtualVideoChange = (e) => {
    setVirtualVideo(e.target.value);
    setVirtualVideoerror("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryerror("");
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
          category,
          maindescription,
          description,
          image1,
          image2,
          VirtualVideo,
          price,
          NoRooms,
          Address,
          Address1,
          googlemap,
          tel,
        },
        { abortEarly: false }
      );

      // Use the URL values directly from the text fields
      const url1 = image1;
      const url2 = image2;

      await addHotel(
        title,
        category,
        maindescription,
        description,
        url1,
        url2,
        VirtualVideo,
        price,
        NoRooms,
        Address,
        Address1,
        googlemap,
        loggedUser?.username,
        loggedUser?.email,
        tel
      );

      toast.success("Hotel Added Successfully");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error Adding Hotel", error);
      toast.error("Error Adding Hotel");
      if (error.name === "ValidationError") {
        error.inner.forEach((e) => {
          switch (e.path) {
            case "title":
              setTitleerror(e.message);
              break;
            case "category":
              setCategoryerror(e.message);
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
            case "VirtualVideo":
              setVirtualVideoerror(e.message);
              break;
            case "price":
              setPriceerror(e.message);
              break;
            case "NoRooms":
              setNoRoomserror(e.message);
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
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Hotel Management
          </Typography>
          <FormGroup
            sx={{ marginLeft: "60%", justifyContent: "flex-end", display: "flex", alignItems: "center" }}
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
          <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex", alignItems: "center" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", marginLeft: "auto" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
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
        sx={{ "& .MuiDrawer-paper": { backgroundColor: "rgba(255, 255, 255, 0.7)", height: "100vh" } }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
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
          <Typography variant="h3" textAlign="center" sx={{ color: handleColor() }}>
            Add Hotel
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "1vh" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Hotel Name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={handleTitleChange}
                helperText={titleerror}
                error={!!titleerror}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                sx={{ marginTop: "2vh" }}
                onChange={(e) => {
                  handleCategoryChange(e);
                }}
                helperText={categoryerror}
                error={!!categoryerror}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
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
                onChange={handleMaindescriptionChange}
                helperText={maindescriptionerror}
                error={!!maindescriptionerror}
                inputProps={{ maxLength: 100 }}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                variant="outlined"
                multiline
                fullWidth
                value={description}
                onChange={handleDescriptionChange}
                helperText={descriptionerror}
                rows={5}
                inputProps={{ maxLength: 400 }}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Replace file inputs with URL text fields for images */}
              <TextField
                id="outlined-image1-url"
                label="Image URL 1"
                variant="outlined"
                fullWidth
                value={image1}
                onChange={handleImage1Change}
                helperText={image1error}
                error={!!image1error}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
              <TextField
                id="outlined-image2-url"
                label="Image URL 2"
                variant="outlined"
                fullWidth
                value={image2}
                onChange={handleImage2Change}
                helperText={image2error}
                error={!!image2error}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
                sx={{ marginTop: "1vh" }}
              />
              <TextField
                id="outlined-virtualvideo-url"
                label="Virtual Video URL"
                variant="outlined"
                fullWidth
                value={VirtualVideo}
                onChange={handleVirtualVideoChange}
                helperText={VirtualVideoerror}
                error={!!VirtualVideoerror}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
                sx={{ marginTop: "1vh" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <TextField
                id="outlined-price"
                label="Price"
                variant="outlined"
                value={price}
                onChange={handlePriceChange}
                error={!!priceerror}
                helperText={priceerror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{ maxLength: 400, type: "number", onInput: handleInputChange }}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
              <TextField
                id="outlined-NoRooms"
                label="No of Rooms"
                variant="outlined"
                value={NoRooms}
                onChange={handleNoRoomsChange}
                error={!!noroomserror}
                helperText={noroomserror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{ maxLength: 400, type: "number", onInput: handleInputChange }}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-address1"
                label="Address 1 (House No, Street Name)"
                variant="outlined"
                value={Address}
                onChange={handleAddressChange}
                helperText={Addresserror}
                error={!!Addresserror}
                fullWidth
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-address2"
                label="Address 2 (City, State, Country, Pincode)"
                variant="outlined"
                value={Address1}
                onChange={handleAddress1Change}
                helperText={Address1error}
                error={!!Address1error}
                fullWidth
                multiline
                rows={2}
                InputProps={{
                  sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <TextField
                  id="outlined-googlemap-url"
                  label="Google Map Embed URL"
                  variant="outlined"
                  value={googlemap}
                  helperText={googlemaperror}
                  sx={{ marginBottom: "2vh" }}
                  onChange={handleGooglemapChange}
                  error={!!googlemaperror}
                  InputProps={{
                    sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" },
                  }}
                />
                <MuiTelInput
                  value={tel}
                  onChange={(e) => handleTelChange(e)}
                  style={{ color: handleColor() }}
                  label="Telephone"
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
                height="100vh"
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
              sx={{ justifyContent: "right", display: "flex", alignItems: "right" }}
            >
              {loading ? (
                <CircularProgress variant="determinate" value={progress} />
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "2vh",
                    width: "10vw",
                    height: "5vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "20px",
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
              <Link href="https://www.embed-map.com" target="_blank" rel="noopener noreferrer">
                https://www.embed-map.com
              </Link>
            </Typography>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 2 : Enter Location{" "}
                <Link href="https://www.embed-map.com" target="_blank" rel="noopener noreferrer">
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img src={GoogleMapImage1} alt="Step 2" width="100%" height="100%" />
            </div>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 3 : Click Generate HTML code{" "}
                <Link href="https://www.embed-map.com" target="_blank" rel="noopener noreferrer">
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img src={GoogleMapImage2} alt="Step 3" width="100%" height="100%" />
            </div>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 4 : Copy only the URL inside the iframe tag (from the src attribute){" "}
                <Link href="https://www.embed-map.com" target="_blank" rel="noopener noreferrer">
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img src={GoogleMapImage3} alt="Step 4" width="100%" height="100%" />
            </div>
            <div>
              <Typography variant="h6" textAlign="center">
                Step 5 : Paste the URL in the text field and check if the map appears in the preview{" "}
                <Link href="https://www.embed-map.com" target="_blank" rel="noopener noreferrer">
                  https://www.embed-map.com
                </Link>
              </Typography>
              <img src={GoogleMapImage4} alt="Step 5" width="100%" height="100%" />
            </div>
          </Carousel>
        </Box>
      </Modal>
    </Box>
  );
}
