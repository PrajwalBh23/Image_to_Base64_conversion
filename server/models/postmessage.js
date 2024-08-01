import mongoose from "mongoose";

const postschema = mongoose.Schema({
    myFile: String
});

const PostMessage = mongoose.model('postmessage', postschema);

export default PostMessage;
