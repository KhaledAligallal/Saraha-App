import { Schema, model } from "mongoose";
const messageschema = new Schema({

    content: {
        type: String,
        required: true,

    },

    sendTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       required:true
    },

    isViewed: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    })
const Message = model('Message', messageschema)

export default Message