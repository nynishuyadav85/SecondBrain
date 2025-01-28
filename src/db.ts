import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const contentSchema = new mongoose.Schema({
    link: {type: String, required: true},
    title: {type: String, required: true},
    tags: {type: [], required: true},
    userId: {type: mongoose.Types.ObjectId, ref: 'User'}
})


export const userModal = mongoose.model('user', userSchema);
export const contentModel = mongoose.model('content', contentSchema)



module.exports = { 
    userModal,
    contentModel
}