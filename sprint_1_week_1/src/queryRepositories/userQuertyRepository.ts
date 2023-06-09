import { User } from '../models/User'
//import { usersCollection } from '../repositories/db'
import { UserModel } from '../models/User'
import { Paginator } from '../models/Paginator'
import { createPaginationQuery, createPaginationResult } from '../helpers/pagination'
import { Request } from 'express'
import { injectable } from 'inversify'

@injectable()
export class UserQueryRepository {
    async getUsers(req: Request): Promise<Paginator<User>> {
        const query = createPaginationQuery(req)
        const skip = (query.pageNumber - 1) * query.pageSize
        // fix any
        const search : any = {}
        if(query.searchLoginTerm != null){
            search.login = {$regex: query.searchLoginTerm, $options: 'i'}
        }
        if(query.searchEmailTerm != null){
            search.email = {$regex: query.searchEmailTerm, $options: 'i'}
        }
        const searchTermsArray = Object.keys(search).map(key => ({ [key]: search[key] }))
        const users = await UserModel.find({$or: searchTermsArray.length === 0 ? [{}] : searchTermsArray}, {projection: {_id: false, password: false,passwordSalt: false, confirmationEmail: false}})
        .sort({[query.sortBy]: query.sortDirection === 'asc' ? 1 : -1})
        .skip(skip).limit(query.pageSize).lean()
        const count = await UserModel.countDocuments({$or: searchTermsArray.length === 0 ? [{}] : searchTermsArray})
        const result = createPaginationResult(count, query, users)
        
        return result
    }
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({email: email})
        return user
    }
    async getUserBylogin(login: string): Promise<User | null> {
        const user = await UserModel.findOne({login: login})
        return user
    }
    async getUserById(id: string): Promise<User | null> {
        const user = await UserModel.findOne({id: id})
        return user
    }
    async findUserByConfirmationCode(code: string): Promise<User | null>{
        const user = await UserModel.findOne({'confirmationEmail.confirmationCode': code})
        return user
    }
    async findUserByConfirmationPasswordCode(code: string): Promise<User | null>{
        const user = await UserModel.findOne({'confirmationPassword.confirmationCode': code})
        return user
    }
}