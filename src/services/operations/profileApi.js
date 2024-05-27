import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { logout } from "./authApi";
import { apiConnector } from "../apiconnector";

export async function getUserEnrolledCourses(token) {
  let result = [];
  const toastId = toast.loading("loading");
  try {

    const response = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null,
      {
        Authorization: `${token}`,
      });


    //      console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector('GET', profileEndpoints.GET_USER_DETAILS_API, null, {
        Authorization: `${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId);
  }
}

export async function getInstructorData(token) {
  const toastId = toast.loading("loading..")
  let result = []
  try {
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `${token}`
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses
    console.log("result ha hhh",result);
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}