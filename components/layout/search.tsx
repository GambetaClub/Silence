import React from "react"
import { Input } from "../ui/input"
import { SearchIcon } from "lucide-react"

const Search = () => {
  return (
    <div className="relative flex flex-1 flex-shrink-0 w-full rounded-lg bg-white">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search for articles..."
        className="w-full border-0 px-10 py-6 text-base md:text-sm overflow-hidden focus-visible:ring-0"
      />
    </div>
  )
}

export default Search
