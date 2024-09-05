
import db from "@/lib/database"
import { NextResponse } from "next/server"


export async function PUT(
  req: Request,
) {
  try {
    // Probably here we would do an authorization validation

    const values = await req.json()

    // We would make sure all values look correct on more time!

    const article = await db.article.create({
      data: { ...values },
    })

    return NextResponse.json(article)

    
  } catch (error) {
    console.log("[CREATING_ARTICLE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
