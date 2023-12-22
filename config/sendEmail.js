const nodemailer = require("nodemailer");

exports.sendmail = async(subject , otp) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            post: 465,
            auth: {
                user: "katish332@gmail.com",
                pass: "mbfr optj bhwn ysdq"
            }
        })
    
        const mailoption =  {
            from: 'Aatish privet limited',
            to: "katish332@gmail.com",
            subject: subject,
            html : `One Time Password is ${otp}`,
        }
        // console.log(otp);
        await transport.sendMail(mailoption);
        // console.log("Email send sucessfull");
    } 
    catch (error) {
        console.log("Email Not Send");
        console.log(error);
        return error;
    }
}