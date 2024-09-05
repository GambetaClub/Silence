import { fetchArticleById } from "@/actions/server/articles"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from "react"
import ArticleEditForm from "./components/ArticleEditForm"

interface ArticlePageProps {
  params: { id: string }
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const article = await fetchArticleById(params.id)
  return (
    <div className="p-6 bg-white rounded-lg">
      {article ? (
        <ScrollArea>
          <ArticleEditForm article={article} />
        </ScrollArea>
      ) : (
        <div>There is no such an article</div>
      )}
    </div>
  )
}

export default ArticlePage
