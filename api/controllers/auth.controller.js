import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Controller for user signup
export const signup = async (req, res, next) => {
    // Destructuring username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Checking if any of the fields (username, email, password) are missing or empty
        if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            // If any field is invalid, throw an error using the error handler with a 400 status code
            throw errorHandler(400, 'All fields are required to be filled');
        }

        // Hashing the password using bcryptjs with a salt of 10
        const hashPassword = await bcryptjs.hash(password, 10);

        // Creating a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // Saving the new user in the database
        await newUser.save();
        
        // Responding with a success message when the user is successfully created
        res.json({ message: 'Signup successful' });
    } catch (error) {
        // Catching any errors and passing them to the next middleware (error handler)
        next(error);
    }
};

// Controller for user signin
export const signin = async(req, res, next) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    // Checking if email or password is missing or empty
    if (!email || !password || email === '' || password === '') {
        // If any field is invalid, throw an error using the error handler with a 400 status code
        throw errorHandler(400, 'All fields are required to be filled');
    }

    try {
        // Finding a user in the database by the email provided
        const validUser = await User.findOne({ email });

        // If the user is not found, throw a 404 error (user not found)
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Comparing the provided password with the stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // If the password is incorrect, throw a 400 error (invalid password)
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }

        // Generating a JWT token for the user using their ID and a secret from the environment variables
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET
        );

        // Removing the password from the user object before sending the response
        const { password: pass, ...rest } = validUser._doc;

        // Sending a response with the user data (excluding password) and setting the JWT token in a cookie
        res.status(200).cookie('access_token', token, {
            httpOnly: true, // Making the cookie accessible only via HTTP, not JavaScript
        }).json(rest);

    } catch (error) {
        // Catching any errors and passing them to the next middleware (error handler)
        next(error);
    }
};
