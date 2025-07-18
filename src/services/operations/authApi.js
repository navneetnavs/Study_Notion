import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading,setToken } from "../../slices/authSlice";
import {setUser} from "../../slices/profileSlice"
import { toast } from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
            console.log("RESET PASSWORD TOKEN....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
            console.log("RESET PASSWORD RESPONSE...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}
export function sendotp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email, checkUserPresent: false
            })
            console.log("SENDOTP API RESPONSE...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Otp sent successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId=toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
export function login(email,password,navigate){
    return async(dispatch)=>{
     const toastId=toast.loading("loading...");
     dispatch(setLoading(true));
     try {
        console.log('2,,,');
        
        const response=await apiConnector("POST",LOGIN_API,{email,password});
        console.log('3,,,,,');
        
        console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Login successfully");
      dispatch(setToken(response.data?.token));
      const userImage=response.data?.user?.image  ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({...response.data.user,user:userImage}));
      localStorage.setItem("token",JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user))

      navigate("/dashboard/my-profile");
     } catch (error) {
        console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
     }
     toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
export function logout(navigate){
    return  (dispatch)=>{

        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out");
      navigate("/");
    }
}