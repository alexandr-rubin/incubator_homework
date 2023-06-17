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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentQueryRepository = void 0;
//import { commentsCollection } from '../repositories/db'
const Comment_1 = require("../models/Comment");
exports.commentQueryRepository = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield Comment_1.CommentModel.findOne({ id: id }, { projection: { _id: false, postId: false } });
            return comment;
        });
    },
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield Comment_1.CommentModel.find({}).lean();
            return comments;
        });
    }
};
