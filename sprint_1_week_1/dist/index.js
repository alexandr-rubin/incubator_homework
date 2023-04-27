"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_router_1 = require("./routes/video-router");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/videos', video_router_1.videosRouter);
app.use('/testing/all-data', video_router_1.videosRouter);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
