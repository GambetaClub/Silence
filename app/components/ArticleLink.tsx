import { SearchParams, stringifySearchParams } from "@/lib/url-state"
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
      className="block transition ease-in-out md:hover:scale-105"
    >
        {article.name}
    </Link>
  )
}

export default ArticleLink
