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
exports.commentRepository = void 0;
const db_1 = require("./db");
exports.commentRepository = {
    updateCommentById(id, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(id);
            if (comment && comment.commentatorInfo.userId !== userId) {
                return null;
            }
            const result = yield db_1.commentsCollection.updateOne({ id: id }, { $set: { content: content } });
            return result.matchedCount === 1;
        });
    },
    deleteCommentById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(id);
            if (comment && comment.commentatorInfo.userId !== userId) {
                return null;
            }
            const result = yield db_1.commentsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.commentsCollection.findOne({ id: id }, { projection: { _id: false, postId: false } });
        });
    },
    testingDeleteAllComments() {
        db_1.commentsCollection.deleteMany({});
    },
};
