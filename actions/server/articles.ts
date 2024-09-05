"use server"
import db from "@/lib/database"

export const fetchArticlesWithPagination = async (
  articleId: string,
  start: number,
  take: number
) => {
  
  return await db.article.findMany({
    skip: start,
    take: take,
  })
}