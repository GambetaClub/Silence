import { Suspense } from "react"
import ArticlesGrid from "./components/ArticlesGrid"
import { parseSearchParams } from "@/lib/url-state"
import { fetchArticlesWithPagination } from "@/actions/server/articles"

interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const start = 0
  const take = 5

  const [articles] = await Promise.all([
    fetchArticlesWithPagination("eso", start, take),
  ])

  const parsedSearchParams = parseSearchParams(searchParams)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto min-h-[200px]">
        <div className="group-has-[[data-pending]]:animate-pulse p-4">
          <ArticlesGrid articles={articles} searchParams={parsedSearchParams} />
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <Suspense fallback={null}></Suspense>
      </div>
    </div>
  )
}
