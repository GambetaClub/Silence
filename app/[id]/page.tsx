import {
  fetchArticleById,
  fetchArticlesWithPagination,
} from "@/actions/server/articles"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchParams } from "@/lib/url-state"
import React from "react"
import ArticleEditForm from "./components/ArticleEditForm"

interface ArticlePageProps {
  params: { id: string }
  searchParams: SearchParams
}

export async function generateStaticParams() {
  const articles = await fetchArticlesWithPagination({})

  return articles.map((article) => ({
    id: article.id.toString(),
  }))
}

const ArticlePage = async ({ params, searchParams }: ArticlePageProps) => {
  const article = await fetchArticleById(params.id)
  if (article) {
    return (
      <ScrollArea>
        <ArticleEditForm article={article} />
      </ScrollArea>
    )
  } else {
    return <div>There is no such an article</div>
  }
}

export default ArticlePage
