import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import BarChartIcon from "@mui/icons-material/BarChart";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Title } from "@mui/icons-material";

const MainListItems = () => {
  const navigate = useNavigate();
  const { 0: firstParam } = useParams();
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const isAddDestination = window.location.pathname.includes("addDestination");
  const isDashboard = window.location.pathname.includes("home");
  const isViewAllDestination = window.location.pathname.includes("viewall");
  const isViewOneDestination = window.location.pathname.includes("viewOne");
  const isorder = window.location.pathname.includes("order");

  const handleColor = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  const handleBackgroundColor = () => {
    if (darkmode) {
      return "blue";
    } else {
      return "Bisque";
    }
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/home");
        }}
        sx={{
          backgroundColor: isDashboard ? handleBackgroundColor() : "inherit",
          color: isDashboard ? handleColor() : "inherit",
        }}
      >
        <ListItemIcon>
          <DashboardIcon
            sx={{ color: isDashboard ? handleColor() : "inherit" }}
          />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          navigate("/viewall");
        }} 
        sx={{
          backgroundColor: isViewAllDestination||isViewOneDestination
            ? handleBackgroundColor()
            : "inherit",
          color: isViewAllDestination||isViewOneDestination ? handleColor() : "inherit",
        }}
      >
        <ListItemIcon>
          <CorporateFareIcon
            sx={{ color: isViewAllDestination ? handleColor() : "inherit" }}
          />
        </ListItemIcon>
        <ListItemText primary="View All" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          navigate("/adminaccess/add");
        }}
        sx={{
          backgroundColor: isAddDestination
            ? handleBackgroundColor()
            : "inherit",
          color: isAddDestination ? handleColor() : "inherit",
        }}
      >
        <ListItemIcon>
          <AddIcon
            sx={{ color: isAddDestination ? handleColor() : "inherit" }}
          />
        </ListItemIcon>
        <ListItemText primary="Add" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          navigate("/order");
        }} 
        sx={{
          backgroundColor: isorder||isorder
            ? handleBackgroundColor()
            : "inherit",
          color: isorder||isorder ? handleColor() : "inherit",
        }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Check Orders" />
      </ListItemButton>
      <Divider />
    </React.Fragment>
  );
};

export default MainListItems;
