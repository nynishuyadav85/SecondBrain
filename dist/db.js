"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.userModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String },
    title: { type: String },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true }
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true }
});
exports.userModal = mongoose_1.default.model('user', userSchema);
exports.contentModel = mongoose_1.default.model('content', contentSchema);
exports.linkModel = mongoose_1.default.model('link', LinkSchema);
module.exports = {
    userModal: exports.userModal,
    contentModel: exports.contentModel,
    linkModel: exports.linkModel
};
