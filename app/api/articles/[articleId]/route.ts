import "server-only"
import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    // Probably here we would do an authorization validation

    const values = await req.json()

    // We would make sure all values look correct on more time!

    const article = await db.article.update({
      where: {
        id: params.articleId,
      },
      data: { ...values },
    })

    return NextResponse.json(article)

  } catch (error) {
    console.log("[UPDATING_ARTICLE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
