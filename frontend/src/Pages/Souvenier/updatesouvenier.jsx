/* eslint-disable no-restricted-globals */
import * as React from "react";
import { styled } from "@mui/material/styles";
import { useQuery } from "react-query";
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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MuiFileInput } from "mui-file-input";
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
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { getSouvenierById, updateSouvenierById } from "../../Api/services/souvenierService";

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

export default function UpdateSouvenier() {
  const idState = useSelector((state) => state.id.id);
  const { data } = useQuery({
    queryFn: () => getSouvenierById(idState),
    enabled: !!idState,
  });

  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  // Instead of file objects, we use URL strings for images and video
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [maindescription, setMaindescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Address, setAddress] = useState("");
  const [Address1, setAddress1] = useState("");
  const [tel, setTel] = useState("");
  // 3D image URL is stored as a string
  const [threedimage, setThreedimage] = useState("");
  
  // Error state variables
  const [titleerror, setTitleerror] = useState("");
  const [maindescriptionerror, setMaindescriptionerror] = useState("");
  const [descriptionerror, setDescriptionerror] = useState("");
  const [priceerror, setPriceerror] = useState("");
  const [Quantityerror, setQuantityerror] = useState("");
  const [Addresserror, setAddresserror] = useState("");
  const [Address1error, setAddress1error] = useState("");
  const [image1error, setImage1error] = useState("");
  const [image2error, setImage2error] = useState("");
  const [videoerror, setVideoerror] = useState("");
  const [telerror, setTelerror] = useState("");
  const [threedimageerror, setThreedimageerror] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setMaindescription(data.maindescription || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setQuantity(data.NoTickets || "");
      setAddress(data.Address || "");
      setAddress1(data.Address1 || "");
      setTel(data.usertel || "");
      setThreedimage(data.threedimage || "");
      // If images or video already exist, use them as defaults:
      setImage1(data.image || "");
      setImage2(data.image1 || "");
      setVideo(data.video || "");
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => clearInterval(timer);
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

  const [openDrawer, setOpenDrawer] = useState(true);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue < 0) {
      event.target.value = 0;
    }
  };

  // Validation schema: note that image1, image2, and video fields are expected as URLs
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
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than 0"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be an integer"),
    Address: Yup.string().trim().required("Address is required"),
    Address1: Yup.string().trim().required("Address is required"),
    tel: Yup.string().trim().required("Telephone is required"),
    threedimage: Yup.string().trim().required("3D Image URL is required"),
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

  // For URL inputs, update the state from the text field
  const handleImage1Change = (e) => {
    setImage1(e.target.value);
    setImage1error("");
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.value);
    setImage2error("");
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.value);
    setVideoerror("");
  };

  const handleThreedimageChange = (e) => {
    setThreedimage(e.target.value);
    setThreedimageerror("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceerror("");
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setQuantityerror("");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddresserror("");
  };

  const handleAddress1Change = (e) => {
    setAddress1(e.target.value);
    setAddress1error("");
  };

  const handleTelChange = (e) => {
    setTel(e);
    setTelerror("");
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      // Validate the form data using the updated schema
      await validationSchema.validate(
        {
          title,
          maindescription,
          description,
          price,
          quantity,
          Address,
          Address1,
          tel,
          threedimage,
        },
        { abortEarly: false }
      );

      // Use entered URL values if provided; otherwise, fallback to existing data
      const finalUrl1 = image1 || data?.image || "";
      const finalUrl2 = image2 || data?.image1 || "";
      const finalUrl3 = video || data?.video || "";

      await updateSouvenierById(
        idState,
        title,
        maindescription,
        description,
        finalUrl1,
        finalUrl2,
        threedimage,
        finalUrl3,
        price,
        quantity,
        Address,
        Address1,
        loggedUser?.username,
        loggedUser?.email,
        tel
      );

      toast.success("Destination Updated Successfully");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error Updating Destination");
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          switch (err.path) {
            case "title":
              setTitleerror(err.message);
              break;
            case "maindescription":
              setMaindescriptionerror(err.message);
              break;
            case "description":
              setDescriptionerror(err.message);
              break;
            case "image1":
              setImage1error(err.message);
              break;
            case "image2":
              setImage2error(err.message);
              break;
            case "video":
              setVideoerror(err.message);
              break;
            case "threedimage":
              setThreedimageerror(err.message);
              break;
            case "price":
              setPriceerror(err.message);
              break;
            case "quantity":
              setQuantityerror(err.message);
              break;
            case "Address":
              setAddresserror(err.message);
              break;
            case "Address1":
              setAddress1error(err.message);
              break;
            case "tel":
              setTelerror(err.message);
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
            Souvenier Management
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
            Update Souvenier
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "1vh" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Destination Name"
                variant="outlined"
                fullWidth
                value={title || data?.title}
                onChange={handleTitleChange}
                helperText={titleerror}
                error={!!titleerror}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Main Description (Only 100 Characters)"
                variant="outlined"
                fullWidth
                value={maindescription || data?.maindescription}
                onChange={handleMaindescriptionChange}
                helperText={maindescriptionerror}
                error={!!maindescriptionerror}
                inputProps={{ maxLength: 100 }}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                variant="outlined"
                multiline
                fullWidth
                value={description || data?.description}
                onChange={handleDescriptionChange}
                helperText={descriptionerror}
                rows={5}
                inputProps={{ maxLength: 400 }}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Here we remove Firebase file inputs and expect URLs instead */}
              <TextField
                id="outlined-image1-url"
                label="Image URL 1"
                variant="outlined"
                fullWidth
                value={image1 || data?.image}
                onChange={handleImage1Change}
                helperText={image1error}
                error={!!image1error}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
              <TextField
                id="outlined-image2-url"
                label="Image URL 2"
                variant="outlined"
                fullWidth
                value={image2 || data?.image1}
                onChange={handleImage2Change}
                helperText={image2error}
                error={!!image2error}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
                sx={{ marginTop: "1vh" }}
              />
              <TextField
                id="outlined-video-url"
                label="Video URL"
                variant="outlined"
                fullWidth
                value={video || data?.video}
                onChange={handleVideoChange}
                helperText={videoerror}
                error={!!videoerror}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
                sx={{ marginTop: "1vh" }}
              />
              <TextField
                id="outlined-threed-url"
                label="3D Image URL"
                variant="outlined"
                fullWidth
                value={threedimage || data?.threedimage}
                onChange={handleThreedimageChange}
                helperText={threedimageerror}
                error={!!threedimageerror}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                id="outlined-price"
                label="Price"
                variant="outlined"
                value={price || data?.price}
                onChange={handlePriceChange}
                error={!!priceerror}
                helperText={priceerror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{ maxLength: 400, type: "number", onInput: handleInputChange }}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
              <TextField
                id="outlined-quantity"
                label="Quantity"
                variant="outlined"
                value={quantity || data?.NoTickets}
                onChange={handleQuantityChange}
                error={!!Quantityerror}
                helperText={Quantityerror}
                sx={{ marginLeft: "1vw", width: "15vw" }}
                inputProps={{ maxLength: 400, type: "number", onInput: handleInputChange }}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-address1"
                label="Address 1 (House No, Street Name)"
                variant="outlined"
                value={Address || data?.Address}
                onChange={handleAddressChange}
                helperText={Addresserror}
                error={!!Addresserror}
                fullWidth
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-address2"
                label="Address 2 (City, State, Country, Pincode)"
                variant="outlined"
                value={Address1 || data?.Address1}
                onChange={handleAddress1Change}
                helperText={Address1error}
                error={!!Address1error}
                fullWidth
                multiline
                rows={2}
                InputProps={{ sx: { color: handleColor(), fontSize: "20px", borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiTelInput
                value={tel || data?.usertel}
                fullWidth
                onChange={(e) => handleTelChange(e)}
                style={{ color: handleColor() }}
                label="Telephone"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ justifyContent: "right", display: "flex", alignItems: "center" }}>
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
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  );
}
