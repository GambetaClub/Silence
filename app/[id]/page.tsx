import {
  fetchArticleById,
  fetchArticlesWithPagination,
} from "@/actions/server/articles"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchParams } from "@/lib/url-state"
import React from "react"

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
  if (params.id) {
    const article = await fetchArticleById(params.id)
    return (
      <ScrollArea>
        <h2 className="text-lg">{article?.name}</h2>
        <div className="flex flex-col">
          <h4>Description</h4>
          {article?.description}
        </div>
      </ScrollArea>
    )
  } else {
    return <div>Hola</div>
  }
}

export default ArticlePage
