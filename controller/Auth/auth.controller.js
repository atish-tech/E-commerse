const bcryptjs = require('bcryptjs');

const userModel = require('../../model/Auth/user.model');
const { newToken } = require('../../utils/utility.function');

// register
const registerController = async (request, response) => {
    try {
        const { email, password } = request.body;

        // email exist
        const checkUser = await userModel.findOne({ email });
        if (checkUser) 
            return response.status(400).send({ message: "Email Already Exist" });
        

        //Create New entry in db
        else {
            const hash = await bcryptjs.hash(password, 9);   // Hash Password

            const user = await userModel.create({   // Add New user in DB
                ...request.body, password: hash, isSeller: false,
            });

            const token = await newToken(user); // Generate goken

            response.status(201).json({ message: 'Account Created Sucessful', token });
        }
    } catch (error) {
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
            const user = await userModel.create({    // Add New user in DB
                ...request.body, password: hash, isVerified: true
            });
            let token = await newToken(user);
            response.status(201).json({ message: "Account Created Sucessfull , please Varify your enail", user, token });
        }
    }
    catch (error) {
        response.status(400).json({ message: "Server Error" });
    }
}

// login
const loginController = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await userModel.findOne({ email });

        // check email 
        if (!user) 
            return response.status(400).json({ message: "Email Not Exist" });
        
        // check password
        if (await bcryptjs.compare(password , user.password)) {
            const token = newToken(user);  // generate new token
            return response.status(201).json({ message: "Login Sucessfull" , token });
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
    deleteUser,
    updateUser,
    addFavorites,
}