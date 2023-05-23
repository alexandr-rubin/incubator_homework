import { Router, Request, Response } from "express"
import { testingDeleteAllVideos } from "./video-router"
import { blogRepository } from "../repositories/blogRespository"
import { postRepository } from "../repositories/postRespository"
import { userRepository } from "../repositories/userRepository"

export const testingRouter = Router({})

testingRouter.delete('/', (req: Request, res: Response) => {
    testingDeleteAllVideos()
    blogRepository.testingDeleteAllBlogs()
    postRepository.testingDeleteAllPosts()
    userRepository.testingDeleteAllUsers()
    res.status(204).send('All data is deleted') 
})