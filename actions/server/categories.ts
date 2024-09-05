"use server"

import db from "@/lib/database"


export const fetchAllCategories = async () => {
  return await db.category.findMany()
} 