import { APILog } from '../models/APILogs'
import { Device } from '../models/Device'
import { User } from '../models/User'
// import { apiLogsCollection, refreshTokensCollection } from '../repositories/db'
import { LogAPIModel } from '../models/APILogs'
import { injectable } from 'inversify'

@injectable()
export class LogAPIRepository {
    async addLog(logEntry: APILog): Promise<boolean> {
        try{
            await LogAPIModel.insertMany([logEntry])
            return true
        }
        catch(err) {
            return false
        }
    }
}