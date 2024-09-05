"use client"
import React, { useRef, useState } from "react"
import { SearchIcon } from "lucide-react"
import { useBackpressure } from "@/lib/use-backpressure"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

const Search = () => {
  const searchParams = useSearchParams()
  let [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || ""
  )
  let inputRef = useRef<HTMLInputElement>(null)
  let { triggerUpdate, formRef } = useBackpressure()

  async function handleSubmit(formData: FormData) {
    let query = formData.get("search") as string
    let newUrl = `/?search=${encodeURIComponent(query)}`
    await triggerUpdate(newUrl)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value
    setSearchValue(newValue)
    formRef.current?.requestSubmit()
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="relative flex flex-1 flex-shrink-0 w-full rounded-lg bg-white"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        name="search"
        id="search"
        onChange={handleInputChange}
        value={searchValue}
        placeholder="Search for articles..."
        className="w-full border-0 px-10 py-6 text-base md:text-sm overflow-hidden focus-visible:ring-0"
      />
    </form>
  )
}

export default Search
