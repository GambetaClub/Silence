"use client"
import { Article } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"

import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatPrice } from "../../../lib/utils"
import { Pencil, X } from "lucide-react"
import MoneyInput from "./MoneyInput"
import { useRouter } from "next/navigation"

interface ArticleEditFormProps {
  article: Article
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Username must be at least 2 characters.",
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

const ArticleEditForm = ({ article }: ArticleEditFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: article.name,
      description: article.description || "",
      price: article.price,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/articles/${article.id}`, values)
      toast.success("Article updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong...")
    }
  }

  return (
    <ScrollArea className="p-4 rounded-lg bg-white">
      <div className="flex justify-between">
        <Button className="ml-auto" onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <div className="flex justify-center items-center">
              <X className="size-4 mr-2" />
              <span>Cancel</span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Pencil className="size-4 mr-2" />
              Edit Article
            </div>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-semibold">{article.name}</div>
          <div className="text-lg">{article.description}</div>
          <div>{formatPrice(article.price)}</div>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of the Article" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please insert more than two characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrption of the article"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please insert more than ten characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MoneyInput
                      label="Price of the Article"
                      placeholder="Price of the Article"
                      form={form}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </ScrollArea>
  )
}

export default ArticleEditForm
