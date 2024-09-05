import * as z from "zod"


export const ArticleFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce
    .number()
    .max(1000, {
      message: "Price must be less than 1000.",
    })
    .min(0, {
      message: "Price must be more than 0.",
    }),
})
