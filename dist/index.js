"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://nynishuyadav85:nishant15@cluster0.zkjov.mongodb.net/secondbrain');
    });
}
main();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        try {
            yield db_1.userModal.create({
                username: username,
                password: password
            });
            res.status(200).json({
                message: "Signed Up"
            });
        }
        catch (error) {
            res.status(411).json({
                message: "User Already Exist"
            });
        }
    });
});
app.post('/api/v1/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        //@ts-ignore
        // localStorage.setItem('token', token)
        const existingUser = yield db_1.userModal.findOne({
            username,
            password
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id
            }, config_1.JWT_KEY);
            res.status(200).json({
                token: token,
                message: "Signed in"
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect creds."
            });
        }
    });
});
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.type;
    yield db_1.contentModel.create({
        link,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content Added"
    });
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userId: userId
    }).populate('userId', 'username');
    res.json({
        content
    });
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteMany({
        contentId: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
}));
app.post('/api/v1/share', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                message: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.Random)(10);
        yield db_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            // @ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Removed Link"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linkModel.findOne({
        hash,
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect Input"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModal.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found , this should iddealy not happen"
        });
        return;
    }
    res.json({
        //@ts-ignore
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000);
