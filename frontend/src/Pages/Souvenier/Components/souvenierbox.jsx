import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setidAction } from "../../../Redux/storeid/storeidAction";
import { useNavigate } from "react-router-dom";
import { deleteSouvenierById } from "../../../Api/services/souvenierService";
function SouvenierBox({
  _id,
  title,
  maindescription,
  description,
  image,
  image1,
  threedimage,
  video,
  price,
  Quantity,
  Address,
  Address1,
  rating,
  location,
  username,
  useremail,
  usertel,
}) {
  const darkmode = useSelector((state) => state.darkmode.darkmode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleColor = () => {
    return darkmode ? "white" : "black";
  };

  const handleDelete = async (id) => {
    try {
      await deleteSouvenierById(id).then((res) => {
        toast.success("Destination Deleted Successfully");
        window.location.reload();
      });
    } catch (error) {
      toast.error("Error Deleting Destination");
    }
  };

  const handleViewOne = (id) => {
    dispatch(setidAction(id));
    navigate("/viewOne");
  };

  const handleUpdate = (id) => {
    dispatch(setidAction(id));
    navigate("/adminaccess/update");
  }

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          width: "25vw",
          height: "500px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
          margin: "10px",
          padding: "10px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          color: "black",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            color: handleColor(),
            justifyContent: "center",
          }}
        >
          {title}
        </Typography>
        <img 
        style={{
          width: "auto",
          height: "250px",
          borderRadius: "10px",
          objectFit: "cover",
          margin: "10px",
        }}
        src={image} alt="souvenier" />
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "15px",
            textAlign: "center",
            color: handleColor(),
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {Address1}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: "10px",
          }}
        >
          <Button
            sx={{
              color: handleColor(),
              backgroundColor: darkmode ? "#2a3eb1" : "#2979ff",
              width: "90%",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onClick={() => handleUpdate(_id)}
          >
            Update
          </Button>
          <Button
            sx={{
              color: handleColor(),
              backgroundColor: darkmode ? "#b2102f" : "#ff1744",
              width: "90%",
              fontSize: "15px",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Button>
        </div>
        <Button
          sx={{
            color: handleColor(),
            backgroundColor: darkmode ? "#14a37f" : "#1de9b6",
            width: "98%",
            fontSize: "15px",
            fontWeight: "bold",
            justifyContent: "center",
            alignSelf: "center",
          }}
          onClick={() => handleViewOne(_id)}
        >
          View
        </Button>
      </Box>
    </>
  );
}

export default SouvenierBox;
