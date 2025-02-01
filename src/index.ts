import express from "express"
import  jwt  from "jsonwebtoken";
import { z } from "zod";
import {contentModel, linkModel, userModal} from './db'
import mongoose from "mongoose";
import { JWT_KEY } from "./config";
import { userMiddleware } from "./middleware";
import { Random } from "./utils";
async function main() {
    await mongoose.connect('mongodb+srv://nynishuyadav85:nishant15@cluster0.zkjov.mongodb.net/secondbrain')
}
main()
const app = express();
app.use(express.json());


app.post('/api/v1/signup', async function (req, res) {
    
    const username = req.body.username;
    const password = req.body.password;
    try {
        await  userModal.create({
            username: username,
            password: password
        })
        res.status(200).json({
            message: "Signed Up"
        })
    } catch (error) {
        res.status(411).json({
            message: "User Already Exist"
        })
    }
    
})

app.post('/api/v1/signin', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
        //@ts-ignore
    
    // localStorage.setItem('token', token)
    const existingUser = await userModal.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
    }, JWT_KEY)
    res.status(200).json({
        token: token,
        message: "Signed in"
    })
    } else {
        res.status(403).json({
            message: "Incorrect creds."
        })
    }
    
})

app.post('/api/v1/content', userMiddleware, async(req, res)=> {
    const link = req.body.link;
    const title = req.body.type;

    await contentModel.create({
        link,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content Added"
    })
})

app.get('/api/v1/content', userMiddleware, async(req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate('userId', 'username')
    res.json({
        content
    }
    )
} )

app.delete('/api/v1/content', userMiddleware, async(req, res) => {
    const contentId = req.body.contentId
    await contentModel.deleteMany({
        contentId: contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post('/api/v1/share', userMiddleware, async(req, res) => {
    const share = req.body.share;

    if(share){
       await linkModel.create({
             //@ts-ignore
            userId: req.userId,
            hash: Random(10)

        })
    } else {
       await linkModel.deleteOne({
            // @ts-ignore
            userId: req.userId,
        })
    }

    res.json({
        message: "Updated Sharable link"
    })
})



app.listen(3000);