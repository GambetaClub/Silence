import { fetchArticleById, fetchArticlesWithPagination } from "@/actions/server/articles"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from "react"
import ArticleEditForm from "./components/ArticleEditForm"
import { SearchParams, stringifySearchParams } from "@/lib/url-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

interface ArticlePageProps {
  params: { id: string }
  searchParams: SearchParams
}



export async function generateStaticParams() {
  const articles = await fetchArticlesWithPagination({});

  return articles.map((article) => ({
    id: article.id,
  }));
}

const ArticlePage = async ({ params, searchParams }: ArticlePageProps) => {
  const article = await fetchArticleById(params.id)


  return (
    <div className="p-6 bg-white rounded-lg">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href={`/?${stringifySearchParams(searchParams)}`}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Articles
        </Link>
      </Button>
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
