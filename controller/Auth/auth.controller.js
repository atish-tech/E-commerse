const bcrypt = require('bcrypt');

const userModel = require('../../model/Auth/user.model');
const userOtp = require('../../model/Auth/user.otp');
const { newToken } = require('../../utils/utility.function');
const { sendmail } = require('../../config/sendEmail');

// register
const registerController = async (request, response) => {
    try {
        const { email, password } = request.body;
        // email exist
        const checkUser = await userModel.findOne({ email });
        if (checkUser) {
            if (!checkUser.isVerified) {
                const OTP = Math.floor(100000 + Math.random() * 900000);   // OTP
                await sendmail("Email Varification", OTP);   // Send otp through Email
                await userOtp.findOneAndUpdate({id : checkUser.id} , { otp: OTP });  // Save user otp in our database

                return response.status(200).send({ message: "Please Verify your Email" });
            }
            return response.status(400).send({ message: "Email Already Exist" });

        }
        else {
            const hash = await bcrypt.hash(password, 9);   // Hash Password
            const OTP = Math.floor(100000 + Math.random() * 900000);   // OTP
            const user = await userModel.create({   // Add New user in DB
                ...request.body, password: hash, isVerified: false, isSeller: false, otp: OTP,
            });

            await userOtp.create({ id: user._id, email: user.email, otp: OTP });  // Save user otp in our database
            await sendmail("Email Varification", OTP);   // Send otp through Email

            let token = await newToken(user);
            response.status(201).json({ message: 'Account Created Sucessful', user, token });
        }
    } catch (error) {
        response.status(400).json({ message: "Server Error" });
    }
}

// verify user otp
const verifyUserOtp = async (request, response) => {
    try {
        const { otp } = request.body;
        const tempUserOtp = await userOtp.findOne({ otp });
        if (!tempUserOtp) {  // if OTP not exist in our database
            response.status(500).json({ message: "OTP not match , Please check your Email" });
            return;
        }
        if (tempUserOtp.otp === otp) {
            await userModel.findByIdAndUpdate(tempUserOtp.id, { isVerified: true });
            const user = await userModel.findById(tempUserOtp.id);
            await userOtp.findByIdAndDelete(tempUserOtp._id);
            response.status(201).json({ message: "Email Varified Sucessfull", user });
        }
        else {
            response.status(400).json({ message: "Wrong OTP" });
        }
    }
    catch (error) {
        response.status(400).json({ message: "Email Not Varified" });
    }
}

// Update Password 
const updatePassword = async (request , response) => {
    try {
        const hash = await bcrypt.hash(request.body.password, 9);   // Hash Password

        const temp = await userModel.findOneAndUpdate({email : request.body.email} , {password : hash});
        response.status(200).json({message : "Password Update Sucessfull" , temp});
    } 
    catch (error) {
        response.status(400).json({message : "Server Error"});
    }
}

// send otp in email
const sendOtpOnEmail = async (request , response) => {
    try {
        const user = await userModel.findOne({email : request.body.email});
        if(!user) {
            return response.status(400).json({message : "Email Not Exist , Please Register your account" });
        }
        const OTP = Math.floor(100000 + Math.random() * 900000);   // OTP
        await sendmail(request.body.message, OTP);   // Send otp through Email
        await userOtp.create({ id: user._id, email: user.email, otp: OTP });  // Save user otp in our database
        return response.status(200).json({message : "OTP send to your email"});
    } 
    catch (error) {
        console.log(error);
        response.status(400).json({ message: "Server Error" });    
    }
}

// login with google
const googleAuth = async (request, response) => {
    try {
        const { email } = request.body;
        let user = await userModel.findOne({ email });
        if (user) {
            let token = await newToken(user);
            return response.status(200).json({user , token});
        }
        else {
            user = await userModel.create({ ...request.body, password: "google-login", isVerified: true, isSeller: false , isAuthGoogle : true});
            let token = await newToken(user);
            response.status(200).send({ message: "Login Sucessfull", token , user })
        }
    }
    catch (error) {
        response.status(400).json({ message: "Server Error" });
    }
}

// seller Registration
const sellerRegisterCoontroller = async (request, response) => {
    try {
        const { email, password, isSeller } = request.body;
        if (isSeller === 'false') {
            response.status(400).json({ message: "It is not seller account type" });
        }
        // create seller account
        else {
            const hash = await bcrypt.hash(password, 9);    // Hash Password
            const OTP = Math.floor(100000 + Math.random() * 900000);   // OTP
            const user = await userModel.create({    // Add New user in DB
                ...request.body, password: hash, isVerified: false
            });
            await userOtp.create({ id: user._id, email: user.email, otp: OTP });  // Save user otp in our database
            await sendmail("Email Varification", OTP);   // Send otp through Email
            let token = await newToken(user);
            response.status(201).json({ message: "Account Created Sucessfull , please Varify your enail", user, token });
        }
    } catch (error) {
        response.status(400).json({ message: "Server Error" });
    }
}

// login
const loginController = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await userModel.findOne({ email });
        // check email 
        if (!user) {
            return response.status(400).json({ message: "Email Not Exist" });

        }
        // check verified or not
        if (user.isVerified === false) {
            return response.status(400).json({ message: "Email Not Verified", });
        }
        // check password
        if (await user.matchPassword(password)) {
            let token = newToken(user);
            return response.status(201).json({ message: "Login Sucessfull", user, token });
        }
        else {
            return response.status(400).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: "server error" });
    }
}

// seller login
const sellerLoginController = async (request, response) => {
    try {
        const { email, password, isSeller } = request.body;
        const user = await userModel.findOne({ email });
        // check email 
        if (!user) {
            response.status(400).json({ message: "Email Not Exist" });
        }
        // check account type
        if (user.isSeller === false) {
            response.status(400).json({ message: "Your account is not seller type" })
        }
        // check password
        if (await user.matchPassword(password)) {
            let token = newToken(user);
            response.status(201).json({ message: "Login Sucessfull", user, token });
        }
        else {
            response.status(400).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: "server error" });
    }
}

// user detail
const userDetailController = async (request, response) => {
    response.status(200).json(request.user);
}

// Update User Detail
const updateUser = async (request, response) => {
    try {
        // const {name} = request.body;
        const data = await userModel.findByIdAndUpdate(request.body.id, request.body, { new: true });

        response.status(200).json({ message: "Update Sucessfull", data });
    }
    catch (error) {
        response.status(400).json({ message: "Udate Faild" });
    }
}

// delete user 
const deleteUser = async (request, response) => {
    try {
        const data = await userModel.findByIdAndDelete(request.params.id);

        response.status(200).json({ data });
    }
    catch (error) {
        response.status(400).json({ message: "Delete Faild" });
    }
}

// Add Favorites
const addFavorites = async (request, response) => {
    try {
        let flag = false;

        request.user.favorites.forEach(f => {
            if (f.id === request.body.id) {
                flag = true;
            }
        });

        if (!flag) {
            await userModel.findByIdAndUpdate(request.user._id,
                { $push: { favorites: request.body } });

            response.status(200).json({ message: "Data Added Sucessfull" });
        }
        else {
            response.status(200)
                .json({ message: "This is already present in your Favorites" });
        }
    }
    catch (error) {
        response.status(400).json({ message: "Faild" });
    }
}

// Remove from favorites
const deleteFavorites = async (request, response) => {
    try {
        let flag = false;

        request.user.favorites.forEach(f => {
            if (f.id === request.body.id) {
                flag = true;
            }
        });
        if (flag) {
            await userModel.findByIdAndUpdate(request.user._id,
                { $pull: { favorites: request.body.id } });
            response.status(200).json({ message: "Data Remove" });
        }
        else {
            response.status(200).json({ message: "Data not present in your favorites" });
        }
    } catch (error) {
        response.status(400).json({ message: "faild" });
    }
}

module.exports = {
    deleteFavorites,
    registerController,
    loginController,
    userDetailController,
    sellerLoginController,
    sellerRegisterCoontroller,
    verifyUserOtp,
    deleteUser,
    updateUser,
    addFavorites,
    googleAuth,
    sendOtpOnEmail,
    updatePassword,
}