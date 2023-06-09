import { PaginationQuery } from '../models/PaginationQuery'
import { Request } from "express"
import { Paginator } from '../models/Paginator'

export const createPaginationQuery = (req: Request): PaginationQuery => {
    const query = req.query
        const resultQuery: PaginationQuery = {
            searchNameTerm: typeof query.searchNameTerm === 'string' ? query.searchNameTerm : null,
            sortBy: typeof query.sortBy === 'string' ? query.sortBy : 'createdAt',
            sortDirection: typeof query.sortDirection === 'string' ? query.sortDirection === 'asc' ? 'asc' : 'desc' : 'desc',
            pageNumber: Number.isNaN(query.pageNumber) || query.pageNumber === undefined ? 1 : +query.pageNumber,
            pageSize: Number.isNaN(query.pageSize) || query.pageSize === undefined ? 10 : +query.pageSize,
            searchEmailTerm: typeof query.searchEmailTerm === 'string' && query.searchEmailTerm !== undefined ? query.searchEmailTerm : null,
            searchLoginTerm: typeof query.searchLoginTerm === 'string' && query.searchLoginTerm !== undefined ? query.searchLoginTerm : null
        }
        return resultQuery
}

export const createPaginationResult = <T>(count: number, query: PaginationQuery, items: T[]): Paginator<T> => {
    const result: Paginator<T> = {
        pagesCount: Math.ceil(count / query.pageSize),
        page: query.pageNumber,
        pageSize: query.pageSize,
        totalCount: count,
        items: items
    }

    return result
}