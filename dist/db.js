"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [], required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' }
});
exports.userModal = mongoose_1.default.model('user', userSchema);
exports.contentModel = mongoose_1.default.model('content', contentSchema);
module.exports = {
    userModal: exports.userModal,
    contentModel: exports.contentModel
};
