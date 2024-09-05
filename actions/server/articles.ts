"use server"
import db from "@/lib/database"
import { SearchParams } from "@/lib/url-state"

const ARTICLES_PER_PAGE = 40

export const fetchArticlesWithPagination = async (
  searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1)
  const skip = (requestedPage - 1) * ARTICLES_PER_PAGE

  let categories: string[] | undefined
  let price =
    (searchParams.price && parseFloat(searchParams.price)) || undefined

  let name = searchParams.search || undefined

  if (typeof searchParams.categories === "string") {
    categories = searchParams.categories
      .split(",")
      .filter((category) => category.trim() !== "") // Filter out empty strings
  }

  return await db.article.findMany({
    where: {
      categories:
        categories !== undefined && categories.length > 0
          ? { some: { name: { in: categories } } }
          : undefined,
      price:
        price !== undefined
          ? { lte: price } // Filter by price greater than or equal to the provided value
          : undefined,
      name:
        name !== undefined
          ? { contains: name, mode: "insensitive" }
          : undefined,
    },
    skip: skip,
    take: ARTICLES_PER_PAGE,
  })
}

export const fetchArticleById = async (articleId: string) => {
  return await db.article.findUnique({ where: { id: articleId } })
}
