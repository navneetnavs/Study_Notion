const {contactUsEmail}=require("../mail/templates/contactFormRes");
const nodeMailer=require("../utils/mailSender");

exports.contactUsControllers= async(req,res)=>{
    const { email,
        firstName,
        lastName,
        message,
        phoneNo,
        countryCode}=req.body;
        console.log(req.body);
        
        try {
            const emailRes= nodeMailer(email,"your data send successfully.",contactUsEmail(firstName,lastName,message,phoneNo,countryCode,email));
            console.log('Email Res',emailRes);
            return res.status(200).json({
                success:true,
                message:"Email send successfully"
            })
            
        } catch (error) {
            console.log("Error ",error);
            console.log("Error Message ",error.message);
            return res.json({

                success:false,
                message:"Something went wrong while sending email "
            })
            
        }

}