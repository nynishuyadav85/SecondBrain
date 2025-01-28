import express from "express"
import  jwt  from "jsonwebtoken";
import { z } from "zod";
import {userModal} from './db'
import mongoose from "mongoose";
async function main() {
    await mongoose.connect('mongodb+srv://nynishuyadav85:nishant15@cluster0.zkjov.mongodb.net/secondbrain')
}
main()
const app = express();
app.use(express.json());
const JWT_KEY = "123"


app.post('/api/v1/signup', function (req, res) {
    
    const username = req.body.username;
    const password = req.body.password;
    userModal.create({
        username: username,
        password: password
    })
    res.status(200).json({
        message: "Signed Up"
    })
})

app.post('/api/v1/signin', function(req, res){
    const username = req.body.username;
    const password = req.body.password;
        //@ts-ignore
    const token = jwt.sign({
            username: username
    }, JWT_KEY)
    localStorage.setItem('token', token)
    userModal.find({
        username
    })
    res.status(200).json({
        token: token,
        message: "Signed in"
    })
})


app.listen(3000);