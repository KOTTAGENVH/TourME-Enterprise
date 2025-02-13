import { apiClient } from "../axios/api";

//Add Hotel
export const addHotel = async (
  title,
  category,
  maindescription,
  description,
  image,
  image1,
  VirtualVideo,
  price,
  NoRooms,
  Address,
  Address1,
  location,
  username,
  useremail,
  usertel
) => {
  try {
    const rating = 0;
    const response = await apiClient.post("/hotel/add-hotel", {
      title,
      category,
      maindescription,
      description,
      image,
      image1,
      VirtualVideo,
      price,
      NoRooms,
      Address,
      Address1,
      rating,
      location,
      username,
      useremail,
      usertel,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get All Hotels
export const getAllHotels = async () => {
  try {
    const response = await apiClient.get("/hotel/get-all-hotels");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get All Hotels by email
export const getAllHotelsbyemail = async (email) => {
  try {
    const response = await apiClient.get(
      `/hotel/get-hotels-by-useremail/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Hotel By Id
export const getHotelById = async (id) => {
  try {
    const response = await apiClient.get(`/hotel/get-single-hotel/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Delete Hotel By Id
export const deleteHotelById = async (id) => {
  try {
    const response = await apiClient.delete(`/hotel/delete-hotel/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Update Hotel By Id
export const updateHotelById = async (
  id,
  title,
  category,
  maindescription,
  description,
  image,
  image1,
  VirtualVideo,
  price,
  NoRooms,
  Address,
  Address1,
  location,
  username,
  useremail,
  usertel
) => {
  try {
    const rating = 0;
    const response = await apiClient.patch(`/hotel/update-hotel/${id}`, {
      title,
      category,
      maindescription,
      description,
      image,
      image1,
      VirtualVideo,
      price,
      NoRooms,
      Address,
      Address1,
      rating,
      location,
      username,
      useremail,
      usertel,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Hotel orders by seller email
export const getHotelOrdersBySellerEmail = async (selleremail) => {
  try {
    const response = await apiClient.get(
      `/hotel-order/get-hotel-order-by-selleremail/${selleremail}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Delete Hotel Order By Id  
export const deleteHotelOrderById = async (id) => {
  try {
    const response = await apiClient.delete(`/hotel-order/delete-hotel-order/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};