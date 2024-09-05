import { SearchParams, stringifySearchParams } from "@/lib/url-state"
import { formatPrice } from "@/lib/utils"
import { Article } from "@prisma/client"
import Link from "next/link"

interface ArticleLinkProps {
  searchParams: SearchParams
  article: Article
}

const ArticleLink = ({ searchParams, article }: ArticleLinkProps) => {
  return (
    <Link
      href={`/${article.id}?${stringifySearchParams(searchParams)}`}
      key={article.id}
      className="block transition ease-in-out md:hover:scale-105 border rounded-lg p-4"
    >
      <div className="flex flex-col">
        {article.name}
        {formatPrice(article.price)}
      </div>
    </Link>
  )
}

export default ArticleLink
