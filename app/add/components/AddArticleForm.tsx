"use client"
import React from "react"
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArticleFormSchema } from "@/lib/constants"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import MoneyInput from "@/components/shared/MoneyInput"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const AddArticleForm = () => {

  const router = useRouter()
  const form = useForm<z.infer<typeof ArticleFormSchema>>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof ArticleFormSchema>) => {
    try {
      const response = await axios.post(`/api/articles/`, values)
      const article = response.data

      console.log(article)
      toast.success("Article created!")
      router.push(`/${article.id}/`)
    } catch {
      toast.error("Something went wrong...")
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
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
    </div>
  )
}

export default AddArticleForm
