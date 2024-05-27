import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { courseEndPoints } from "../apis";
// import { updateCompletedLectures } from "../../slices/viewCourseSlice";

const BASE_URL=process.env.REACT_APP_BASE_URL;

export const getAllCourses=async()=>{
    const toastId=toast.loading("loading");
    let result=[];
    try {
        const response=await apiConnector("GET",courseEndPoints.GET_COURSES_API);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
          }
          result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}
export const fetchCourseDetails=async(courseId)=>{
    const toastId=toast.loading("loading");
    let result=null;
    try {
      
      
        const response=await apiConnector("POST",courseEndPoints.COURSE_DETAILS_API,{courseId});
        console.log("COURSE_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;

}

export const fetchCourseCategories = async () => {
    let result = [];
    const toastId=toast.loading("loading");

    try {
      const response = await apiConnector("GET", courseEndPoints.COURSE_CATEGORIES_API);
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
  }
export const createCourse=async(data,token) =>{
    const toastId=toast.loading("loading");
    let result=null;

 try {
    const response=await apiConnector("POST",courseEndPoints.CREATE_COURSE_API,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
    });
    console.log('response...........',response);
    
    if(!response?.data?.success){
        throw new Error("could not create course");
    }
    console.log("CREATE COURSE API RESPONSE............", response);
    toast.success("course create successfully.");
    result=response?.data?.data;
 } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  
 }
 toast.dismiss(toastId);
 return result;
}

export const editCourseDetails=async(data,token)=>{
    const toastId=toast.loading("loading");
    let result=null;
    try {
        const response=await apiConnector("POSt",courseEndPoints.EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
        });
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// create a section
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndPoints.CREATE_SECTION_API, data, {
        Authorization: `${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response?.data?.updatedCourseDetail;
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // create a subsection
  export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    console.log("ok>>>>>",data)
    try {
      const response = await apiConnector("POST", courseEndPoints.CREATE_SUBSECTION_API, data, {
        Authorization: `${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // update a section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndPoints.UPDATE_SECTION_API, data, {
        Authorization: `${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // update a subsection
  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndPoints.UPDATE_SUBSECTION_API, data, {
        Authorization: `${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // delete a section
  export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      console.log('token........',token);
      
      const response = await apiConnector("POST", courseEndPoints.DELETE_SECTION_API, data, {
        Authorization: `${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // delete a subsection
  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndPoints.DELETE_SUBSECTION_API, data, {
        Authorization: ` ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // fetching all courses under a specific instructor
  export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    console.log("tota",token);
    try {
      const response = await apiConnector(
        "GET",
        BASE_URL + "/course/getInstructorCourses",
        null,
        {
          Authorization: `${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // delete a course
  export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    console.log("ooojjjj",data);
    console.log(token);
    try {
      const response = await apiConnector("DELETE",  BASE_URL + "/course/deleteCourse", data, {
        Authorization: ` ${token}`
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }
  
  // get full details of a course
  export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...") 
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        courseEndPoints.GET_FULLCOURSE_DETAILS_API,
        {
          courseId,
        },
        {
          Authorization: ` ${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId) 
    //   dispatch(setLoading(false));
    return result
  }
  
  // mark a lecture as complete
  export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndPoints.LECTURE_COMPLETION_API, data, {
        Authorization: ` ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }
  
  // create a rating for course
  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", courseEndPoints.CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }