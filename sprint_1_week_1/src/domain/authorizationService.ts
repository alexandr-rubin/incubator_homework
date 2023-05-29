import { Login } from "../models/Login"
import { User } from "../models/User"
import { authorizationRepository } from "../repositories/authorizationRepository"
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns'
import bcrypt from 'bcrypt'
import { userService } from "./userService"
import { userRepository } from "../repositories/userRepository"
import { emailService } from "./emailService"

export const authorizationService = {
    async login(body: Login): Promise<User | null> {
        const login = {
            loginOrEmail: body.loginOrEmail,
            password: body.password
        }
        return authorizationRepository.login(login)
    },
    async createUser(user: User){
        const passSalt = await bcrypt.genSalt(10)
        const passwordHash = await userService._generateHash(user.password, passSalt)
        const newUser: User = {
            id: user.id,
            login: user.login,
            password: passwordHash,
            passwordSalt: passSalt,
            email: user.email,
            createdAt: new Date().toISOString(),
            confirmationEmail: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }

        const createResult = await userRepository.addUser(newUser)
        await emailService.sendEmail(newUser.email, newUser.confirmationEmail.confirmationCode)
        return createResult
    },
    async confrmEmail(code: string): Promise<boolean>{
        const user = await userRepository.findUserByConfirmationCode(code)
        if (!user)
            return false
        if (user.confirmationEmail.isConfirmed)
            return false
        if(user.confirmationEmail.expirationDate < new Date()){
            return false
        }
        
        const result = await userRepository.updateConfirmation(user.id)
            return result
    },
    async resendEmail(email: string): Promise<boolean>{
        const user = await userRepository.getUserByEmail(email)
        if (!user)
            return false
        if (user.confirmationEmail.isConfirmed)
            return false
        if(user.confirmationEmail.expirationDate < new Date()){
            return false
        }

        await emailService.sendEmail(email, user.confirmationEmail.confirmationCode)
        return true
    }
}