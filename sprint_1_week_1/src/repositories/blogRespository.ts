import { injectable } from 'inversify'
import { Blog } from '../models/Blog'
//import { blogsCollection } from './db'
import { BlogModel } from '../models/Blog'

@injectable()
export class  BlogRepository {
    async addBlog(blog: Blog): Promise<boolean> {
        // TODO: return
        try{
            await BlogModel.insertMany([blog])
            return true
        }
        catch(err){
            return false
        }
    }
    async updateBlogById(id: string, newBlog: Blog): Promise<boolean> {
        const result = await BlogModel.updateOne({id: id}, { newBlog })
        return result.matchedCount === 1
    }
    async deleteBlogById(id: string): Promise<boolean> {
        const result = await BlogModel.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async testingDeleteAllBlogs() {
        await BlogModel.deleteMany({})
    }
}