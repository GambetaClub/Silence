"use server"

import db from "@/lib/database"
import { unstable_cache } from "next/cache";


const _fetchAllCategories = async () => {
  return await db.category.findMany()
} 

export const fetchAllCategories = unstable_cache(_fetchAllCategories)