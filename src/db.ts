import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const contentSchema = new mongoose.Schema({
    link: {type: String},
    title: {type: String},
    tags: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true}
})


export const userModal = mongoose.model('user', userSchema);
export const contentModel = mongoose.model('content', contentSchema)



module.exports = { 
    userModal,
    contentModel
}