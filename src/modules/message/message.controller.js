import Message from "../../../DB/models/message.model.js";
import User from "../../../DB/models/user.model.js";
import { findDocument } from "../../../DB/dbMethode.js";

// Function to send a message to a user
export const sendMessage = async (req, res, next) => {
    const { content } = req.body; // Extracting message content from request body
    const { sendTo } = req.params; // Extracting recipient ID from URL parameters

    // Checking if the recipient user exists
    const isUserExists = await findDocument(User, { _id: sendTo });
    if (!isUserExists.success) {
        return res.status(isUserExists.status).json({ message: isUserExists.msg });
    }

    // Creating the message and assigning it to the recipient
    const createdMessage = await Message.create({ content, sendTo });
    if (!createdMessage) {
        return res.status(404).json({ message: 'Message creation failed' });
    }

    // Returning success message for message creation
    res.status(200).json({ message: 'Message creation success' });
};

// Function to delete a message
export const deleteMessage = async (req, res, next) => {
    const { loggedinUserid, messageId } = req.query; // Extracting logged-in user ID and message ID from query parameters

    // Deleting the message if it belongs to the logged-in user
    const deletedMessage = await Message.findOneAndDelete({ _id: messageId, sendTo: loggedinUserid });
    if (!deletedMessage) {
        return res.status(404).json({ message: 'DELETE FAIL' });
    }

    // Returning success message for message deletion
    return res.status(200).json({ message: 'Deleted success' });
};

// Function to mark a message as read
export const markMessageAsRead = async (req, res, next) => {
    const { loggedinUserid, messageId } = req.query; // Extracting logged-in user ID and message ID from query parameters

    // Updating the message to mark it as read if it belongs to the logged-in user and is not already marked as read
    const updatedMessage = await Message.findByIdAndUpdate(
        { _id: messageId, sendTo: loggedinUserid, isViewed: false },
        { isViewed: true, $inc: { __v: 1 } }, // Incrementing the version number to trigger change detection
        { new: true }
    );

    if (!updatedMessage) {
        return res.status(404).json({ message: 'Update fail' });
    }

    // Returning success message for updating the message
    return res.status(200).json({ message: 'Update success' });
};

// Function to list user messages
export const listUserMessage = async (req, res, next) => {
    const { isViewed, loggedinUserid } = req.query; // Extracting viewed status and logged-in user ID from query parameters

    // Finding and sorting messages for the logged-in user based on viewed status and creation time
    const messages = await Message
        .find({ sendTo: loggedinUserid, isViewed })
        .sort({ createdAt: 'desc' });

    // Returning success message along with the user's messages
    return res.status(200).json({ message: 'Your messages:', messages });
};

