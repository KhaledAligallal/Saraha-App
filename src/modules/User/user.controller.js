
import User from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs'

// SignUp Function
export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body; // Extracting username, email, and password from the request body

    // Checking if the username already exists in the database
    const isUsernameDuplicate = await User.findOne({ username });
    if (isUsernameDuplicate) {
        return res.json({ message: 'Username already exists', status: 400 });
    }

    // Checking if the email already exists in the database
    const isEmailDuplicate = await User.findOne({ email });
    if (isEmailDuplicate) {
        return res.json({ message: 'Email already exists', status: 400 });
    }

    // Hashing the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

    // Creating a new user with hashed password
    const createdUser = await User.create({ username, email, password: hashedPassword });
    if (!createdUser) {
        return res.json({ message: 'User registration failed', status: 400 });
    }

    // Returning success message and created user data
    return res.json({ message: 'User registration success', status: 200, createdUser });
};

// SignIn Function
export const signIn = async (req, res, next) => {
    const { username, email, password } = req.body; // Extracting username/email and password from the request body

    // Finding the user by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        return res.json({ message: 'Invalid login credentials', status: 400 });
    }

    // Comparing the entered password with the hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: 'Invalid login credentials', status: 400 });
    }

    // Returning success message for login
    return res.json({ message: 'Login success', status: 200 });
};

// Update Function
export const Update = async (req, res, next) => {
    const { username, email } = req.body; // Extracting username and email from the request body
    const { _id } = req.query; // Extracting the user ID from the query parameters
    let updateObject = {}; // Object to store the fields to be updated

    // Checking if username needs to be updated
    if (username) {
        // Checking if the new username already exists
        const isUsernameDuplicate = await User.findOne({ username });
        if (isUsernameDuplicate) {
            return res.json({ message: 'Username already exists', status: 400 });
        }
        updateObject.username = username; // Adding username to the update object
    }

    // Checking if email needs to be updated
    if (email) {
        // Checking if the new email already exists
        const isEmailDuplicate = await User.findOne({ email });
        if (isEmailDuplicate) {
            return res.json({ message: 'Email already exists', status: 400 });
        }
        updateObject.email = email; // Adding email to the update object
    }

    // Updating the user with the provided ID using the update object
    const updateUser = await User.updateOne({ _id }, updateObject);
    if (!updateUser.modifiedCount) {
        return res.json({ message: 'Invalid user ID', status: 400 });
    }

    // Returning success message for update
    return res.json({ message: 'Update success', status: 200 });
};

// Delete Function
export const Delete = async (req, res, next) => {
    const { _id, loggedid } = req.query; // Extracting the user ID and logged-in user ID from the query parameters

    // Checking if the user requesting deletion is the same as the user whose account is being deleted
    if (_id !== loggedid) {
        return res.json({ message: 'Not allowed' });
    }

    // Deleting the user account with the provided ID
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
        return res.json({ message: 'Delete failed', status: 400 });
    }

    // Returning success message for deletion
    return res.json({ message: 'Deleted success', status: 200 });
};

// getUserData Function
export const getUserData = async (req, res, next) => {
    const { _id } = req.query; // Extracting the user ID from the query parameters

    // Finding the user by ID and returning only the username
    const user = await User.findById(_id, 'username');
    if (!user) {
        return res.json({ message: 'Invalid user ID', status: 400 });
    }

    // Returning success message along with the user data (username)
    return res.json({ message: 'Done', status: 200, user });
};
