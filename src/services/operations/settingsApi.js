import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoint } from "../apis";
import { logout } from "./authApi";



const { UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_ACCOUNT_API
} = settingsEndpoint;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      console.log("hellow;;;;;")
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      });
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      console.log(response.data.data);
      
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId);
  }
}
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      console.log('heeeeeeeeeee');

      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      });
      console.log('hellow');

      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
    
       console.log(response.data.updatedDetails);
      
      dispatch(setUser(response.data.updatedDetails));
     localStorage.setItem("user", JSON.stringify(response.data.updatedDetails));  
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId);
  }
}

export function changePassword(token,formData){
  return async()=>{
    const toastId = toast.loading("loading");
  try {
    const response=await apiConnector('POST',CHANGE_PASSWORD_API,formData,{
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    });
    console.log(
      "CHANGE_PASSWORD_API API RESPONSE............",
      response
    );
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Change Successfully");

  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
  }
}
export function deleteAccount(token,navigate){
  return async(dispatch)=>{

    const toastId=toast.loading("loading");
    try {
    
      
       const response=await apiConnector("DELETE",DELETE_ACCOUNT_API,null,{
         "Content-Type": "multipart/form-data",
         Authorization: `${token}`,
       });
       
       
       console.log("DELETE_PROFILE_API API RESPONSE............", response)

       if (!response.data.success) {
         throw new Error(response.data.message)
       }
       toast.success("Profile Deleted Successfully");
       dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId);
  }
}