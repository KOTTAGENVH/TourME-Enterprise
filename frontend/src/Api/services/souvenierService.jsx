import { apiClient } from "../axios/api";

//Add Souvenier
export const addSouvenier = async (
  title,
  maindescription,
  description,
  image,
  image1,
  threedimage,
  video,
  price,
  Quatity,
  Address,
  Address1,
  username,
  useremail,
  usertel
) => {
  try {
    const rating = 0;
    const response = await apiClient.post("/souvenier/create-souvenier", {
      title,
      maindescription,
      description,
      image,
      image1,
      threedimage,
      video,
      price,
      Quatity,
      Address,
      Address1,
      rating,
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

//Get All Souveniers
export const getAllSouveniers = async () => {
  try {
    const response = await apiClient.get("/souvenier/get-all-souveniers");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Souvenier By Id
export const getSouvenierById = async (id) => {
  try {
    const response = await apiClient.get(
      `/souvenier/get-single-souvenier/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Delete Souvenier By Id
export const deleteSouvenierById = async (id) => {
  try {
    const response = await apiClient.delete(
      `/souvenier/delete-souvenier/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Get Souvenier by Email
export const getSouvenierByEmail = async (email) => {
  try {
    const response = await apiClient.get(
      `/souvenier/get-souvenier-by-selleremail/${email}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//Update Souvenier By Id
export const updateSouvenierById = async (
  id,
  title,
  maindescription,
  description,
  image,
  image1,
  threedimage,
  video,
  price,
  Quatity,
  Address,
  Address1,
  username,
  useremail,
  usertel
) => {
  try {
    const rating = 0;
    const response = await apiClient.patch(
      `/souvenier/update-souvenier/${id}`,
      {
        title,
        maindescription,
        description,
        image,
        image1,
        threedimage,
        video,
        price,
        Quatity,
        Address,
        Address1,
        rating,
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

//Get Souvenier Orders by seller email
export const getSouvenierOrders = async (selleremail) => {
  try {
    const response = await apiClient.get(
      `/souvenier-order/get-souvenier-order-by-selleremail/${selleremail}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//Update souvenier order
export const updateSouvenierOrder = async (id,status) => {
  try {
    const response = await apiClient.patch(
      `/souvenier-order/update-souvenier-order/${id}`,
      {
        state: status,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
