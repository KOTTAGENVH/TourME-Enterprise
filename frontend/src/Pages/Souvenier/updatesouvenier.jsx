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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Api/firebase";
import { useState } from "react";
import * as Yup from "yup";
import {
  getSouvenierById,
  updateSouvenierById,
} from "../../Api/services/souvenierService";

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
  const { data } = useQuery({
    queryFn: () => getSouvenierById(idState),
  });

  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [image1, setImage1] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [title, setTitle] = useState(data?.title || "");
  const [maindescription, setMaindescription] = useState(
    data?.maindescription || ""
  );
  const [description, setDescription] = useState(data?.description || "");
  const [price, setPrice] = useState(data?.price || "");
  const [quantity, setQuantity] = useState(data?.NoTickets || "");
  const [Address, setAddress] = useState(data?.Address || "");
  const [Address1, setAddress1] = useState(data?.Address1 || "");
  const [tel, setTel] = useState(data?.usertel || "");
  const [titleerror, setTitleerror] = useState("");
  const [maindescriptionerror, setMaindescriptionerror] = useState("");
  const [threedimage, setThreedimage] = useState(data?.description || "");
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

  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const idState = useSelector((state) => state.id.id);

  React.useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setMaindescription(data.maindescription || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setQuantity(data?.Quatity || "");
      setAddress(data.Address || "");
      setAddress1(data.Address1 || "");
      setTel(data.usertel || "");
      setThreedimage(data.threedimage || "");
    }
  }, [data]);

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
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than 0"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be an integer"),
    Address: Yup.string().trim().required("Address is required"),
    Address1: Yup.string().trim().required("Address is required"),
    tel: Yup.string().trim().required("Telephone is required"),
    threedimage: Yup.string().trim().required("3D Image is required"),
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

  const handleVideoChange = (e) => {
    setVideo(e);
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

      // Validate the form data
      await validationSchema.validate(
        {
          title,
          maindescription,
          description,
          price,
          quantity,
          Address,
          Address1,
          threedimage,
          tel,
        },
        { abortEarly: false }
      );

      let url1 = "";
      let url2 = "";
      let url3 = "";

      const finalUrl1 = url1 || data?.image || "";
      const finalUrl2 = url2 || data?.image1 || "";
      const finalUrl3 = url3 || data?.video || "";

      if (image1 !== null && image2 !== null && video !== null) {
        const storage1Ref = ref(storage, image1?.name);
        const storage2Ref = ref(storage, image2?.name);
        const storage3Ref = ref(storage, video?.name);

        const uploadTask1 = await uploadBytes(storage1Ref, image1);
        url1 = await getDownloadURL(uploadTask1.ref);

        const uploadTask2 = await uploadBytes(storage2Ref, image2);
        url2 = await getDownloadURL(uploadTask2.ref);

        const uploadTask3 = await uploadBytes(storage3Ref, video);
        url3 = await getDownloadURL(uploadTask3.ref);
      }

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
            case "video":
              setVideoerror(e.message);
              break;
            case "threedimage":
              setThreedimageerror(e.message);
              break;
            case "price":
              setPriceerror(e.message);
              break;
            case "quantity":
              setQuantityerror(e.message);
              break;
            case "Address":
              setAddresserror(e.message);
              break;
            case "Address1":
              setAddress1error(e.message);
              break;
            case "tel":
              setTelerror(e.message);
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
                value={maindescription || data?.maindescription}
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
                value={description || data?.description}
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
              <MuiFileInput
                sx={{ height: "8vh" }}
                fullWidth
                error={false}
                label="Upload your video"
                value={video}
                helperText={videoerror}
                onChange={(e) => {
                  handleVideoChange(e);
                }}
                InputProps={{
                  inputProps: {
                    accept: "video/*",
                  },
                  endAdornment: <AttachFileIcon />,
                }}
              />
              <TextField
                id="outlined-basic"
                label="Add 3D image url"
                variant="outlined"
                fullWidth
                value={threedimage || data?.threedimage}
                onChange={(e) => {
                  handleThreedimageChange(e);
                }}
                helperText={threedimageerror}
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
                value={price || data?.price}
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
                label="Quantity "
                variant="outlined"
                value={quantity}
                onChange={(e) => {
                  handleQuantityChange(e);
                }}
                error={false}
                helperText={Quantityerror}
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
                value={Address1 || data?.Address1}
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
                value={Address || data?.Address}
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
              <MuiTelInput
                fullWidth
                value={tel}
                onChange={(e) => {
                  handleTelChange(e);
                }}
                style={{
                  color: handleColor(),
                }}
                label="Telephone"
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
                <CircularProgress
                  sx={{
                    marginTop: "4vh",
                    width: "10vw",
                    height: "5vh",
                    marginLeft: "50vw",
                    marginRight: "auto",
                    justifyContent: "center",
                    alignItems: "right",
                    justifySelf: "right",
                    alignSelf: "right",
                  }}
                  variant="determinate"
                  value={progress}
                />
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "4vh",
                    width: "10vw",
                    height: "5vh",
                    marginLeft: "50vw",
                    marginRight: "auto",
                    justifyContent: "center",
                    alignItems: "right",
                    justifySelf: "right",
                    alignSelf: "right",
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
