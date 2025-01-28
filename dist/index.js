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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://nynishuyadav85:nishant15@cluster0.zkjov.mongodb.net/secondbrain');
    });
}
main();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_KEY = "123";
app.post('/api/v1/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    db_1.userModal.create({
        username: username,
        password: password
    });
    res.status(200).json({
        message: "Signed Up"
    });
});
app.post('/api/v1/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, JWT_KEY);
    localStorage.setItem('token', token);
    res.status(200).json({
        token: token,
        message: "Signed in"
    });
});
app.listen(3000);
