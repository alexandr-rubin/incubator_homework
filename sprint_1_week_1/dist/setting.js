"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const video_router_1 = require("./routes/video-router");
const postRouter_1 = require("./routes/postRouter");
const blogRouter_1 = require("./routes/blogRouter");
const testingRouter_1 = require("./routes/testingRouter");
const userRouter_1 = require("./routes/userRouter");
const loginRouter_1 = require("./routes/loginRouter");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/testing/all-data', testingRouter_1.testingRouter);
exports.app.use('/auth', loginRouter_1.loginRouter);
//app.use(basicAuthMiddleware)
exports.app.use('/videos', video_router_1.videosRouter);
exports.app.use('/posts', postRouter_1.postsRouter);
exports.app.use('/blogs', blogRouter_1.blogsRouter);
exports.app.use('/users', userRouter_1.usersRouter);
