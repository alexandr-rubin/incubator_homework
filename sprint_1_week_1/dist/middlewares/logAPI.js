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
exports.logAPIMiddleware = void 0;
const httpStatusCode_1 = require("../helpers/httpStatusCode");
// import { apiLogsCollection } from "../repositories/db"
const APILogs_1 = require("../models/APILogs");
const logAPIRepository_1 = require("../repositories/logAPIRepository");
const logAPIMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const logAPIRepositoryInst = new logAPIRepository_1.LogAPIRepository();
    const currentDate = new Date();
    const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
    const filter = {
        IP: req.ip,
        URL: req.originalUrl,
        date: { $gte: tenSecondsAgo.toISOString() }
    };
    const count = yield APILogs_1.LogAPIModel.countDocuments(filter);
    if (count >= 5) {
        return res.sendStatus(httpStatusCode_1.HttpStatusCode.TOO_MANY_REQUESTS_429);
    }
    const logEntry = Object.assign(Object.assign({}, filter), { date: currentDate.toISOString() });
    const isAdded = yield logAPIRepositoryInst.addLog(logEntry);
    if (!isAdded) {
        // какую ошибку
        return res.sendStatus(httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR_500);
    }
    return next();
});
exports.logAPIMiddleware = logAPIMiddleware;
