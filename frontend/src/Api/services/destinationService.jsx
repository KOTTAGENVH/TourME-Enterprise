import { apiClient } from "../axios/api";

//Add Destination
export const addDestination = async (
  title,
  maindescription,
  description,
  image,
  image1,
  price,
  NoTickets,
  Address,
  Address1,
  location,
  username,
  useremail,
  usertel
) => {
  try {
    const rating = 0;
    const response = await apiClient.post("/destination/add-destination", {
      title,
      maindescription,
      description,
      image,
      image1,
      price,
      NoTickets,
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

//Get All Destinations
export const getAllDestinations = async () => {
  try {
    const response = await apiClient.get("/destination/get-all-destinations");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Destination By Email
export const getDestinationByEmail = async (email) => {
  try {
    const response = await apiClient.get(
      `/destination/get-destination-by-useremail/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Delete Destination By Id
export const deleteDestinationById = async (id) => {
  try {
    const response = await apiClient.delete(
      `/destination/delete-destination/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Destination By Id
export const getDestinationById = async (id) => {
  try {
    const response = await apiClient.get(
      `/destination/get-destination-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Update Destination By Id
export const updateDestinationById = async (
  id,
  title,
  maindescription,
  description,
  image,
  image1,
  price,
  NoTickets,
  Address,
  Address1,
  location,
  username,
  useremail,
  usertel
) => {
  try {
    const response = await apiClient.patch(
      `/destination/update-destination/${id}`,
      {
        title,
        maindescription,
        description,
        image,
        image1,
        price,
        NoTickets,
        Address,
        Address1,
        location,
        username,
        useremail,
        usertel,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Destination orders by seller email
export const getDestinationOrdersBySellerEmail = async (selleremail) => {
  try {
    const response = await apiClient.get(
      `/destination-order/get-destination-order-by-seller-email/${selleremail}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Delete Destination Order By Id
export const deleteDestinationOrderById = async (id) => {
  try {
    const response = await apiClient.delete(
      `/destination-order/delete-destination-order/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};