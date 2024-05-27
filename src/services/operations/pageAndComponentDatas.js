import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { catalogData } from "../apis";

export const getCatalogPageData = async(categoryId) => {
    const toastId=toast.loading("loading...")
    let result=[]
    try {
        console.log('777777777777777');
        
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
        console.log('reeeeeee',response);
        
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Catagory page data.")
          }
          result = response?.data
    } catch (error) {
        console.log("CATALOGPAGEDATA_API API ERROR............", error)
        toast.error(error.message)
        result = error.response?.data
    }
    toast.dismiss(toastId)
    return result;

}