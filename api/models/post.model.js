import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        reqiured: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,

    },
    image: {
        type: String,
        default: 'image',
    },
    category: {
        type:String,
        default:'uncategorized',
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);
export default Post