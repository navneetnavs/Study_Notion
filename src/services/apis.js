const BASE_URL=process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints={
    SENDOTP_API:BASE_URL+ "/auth/sendotp",
    SIGNUP_API:BASE_URL + "/auth/signup",
    LOGIN_API:BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",

}
// student endpoinsts
export const studentEndPoint={
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API:BASE_URL+"/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail"

}

// COURSE ENDPOINTS
export  const courseEndPoints={
  GET_COURSES_API: BASE_URL+"/course/getAllCourses",
  COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_FULLCOURSE_DETAILS_API:BASE_URL+"/course/getFullCourseDetails"
}
// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourse",
    GET_INSTRUCTOR_DATA_API :BASE_URL + "/profile/instructorDashboard"
  }
// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRating",
  }
  
// CATALOGY PAGE DATA
export const catalogData={
    CATALOGPAGEDATA_API:BASE_URL+"/course/categoryPageDetails"

}
// CATAGORIES API
export const categories={
    CATEGORIES_API: BASE_URL+ "/course/showAllCategories"
}
// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTING PAGE API
  export const settingsEndpoint={
    UPDATE_DISPLAY_PICTURE_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateProfile",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changePassword",
    DELETE_ACCOUNT_API:BASE_URL + "/profile/deleteAccount"
  }