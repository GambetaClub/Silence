import { SearchParams } from "@/lib/url-state"
import { Article } from "@prisma/client"
import React from "react"
import ArticleLink from "./ArticleLink"

interface ArticlesGridProps {
  articles: Article[]
  searchParams: SearchParams
}

const ArticlesGrid = ({ articles, searchParams }: ArticlesGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {!articles?.length ? (
        <p className="text-center text-muted-foreground col-span-full">
          No articles found.
        </p>
      ) : (
        articles.map((article) => (
          <ArticleLink
            key={article.id}
            article={article}
            searchParams={searchParams}
          />
        ))
      )}
    </div>
  )
}

export default ArticlesGrid
