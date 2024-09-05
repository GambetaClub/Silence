"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useOptimistic, useTransition } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  parseSearchParams,
  SearchParams,
  stringifySearchParams,
} from "@/lib/url-state"
import { Category } from "@prisma/client"
import { Slider } from "../ui/slider"

interface FilterBaseProps {
  categories: Category[]
  searchParams: URLSearchParams
}

function FilterBase({ categories, searchParams }: FilterBaseProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const initialFilters = parseSearchParams(Object.fromEntries(searchParams))
  const [optimisticFilters, setOptimisticFilters] =
    useOptimistic<SearchParams>(initialFilters)

  const updateURL = (newFilters: SearchParams) => {
    const queryString = stringifySearchParams(newFilters)
    router.push(queryString ? `/?${queryString}` : "/")
  }

  const handleFilterChange = (
    filterType: keyof SearchParams,
    value: string | undefined
  ) => {
    startTransition(() => {
      const newFilters = { ...optimisticFilters, [filterType]: value }
      setOptimisticFilters(newFilters)
      updateURL(newFilters)
    })
  }

  const handleCategoryToggle = (category: string) => {
    const currentCategories = optimisticFilters.categories?.split(",") || []

    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((cat) => cat !== category)
      : [...currentCategories, category]

    handleFilterChange("categories", newCategories.join(","))
  }

  const handleClearFilters = () => {
    startTransition(() => {
      setOptimisticFilters({})
      router.push("/")
    })
  }

  const maxPrice = Number(optimisticFilters.price) || 1000

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className="flex-shrink-0 flex flex-col h-full rounded-lg"
    >
      <ScrollArea className="flex-grow">
        <h2>Filter</h2>
        <div className="p-2 space-y-4">
          {/* Price Filter */}
          <div>
            <Label htmlFor="price">Price Range</Label>
            <Slider
              id="price"
              min={0}
              max={1000}
              step={10}
              value={[maxPrice]}
              onValueChange={([value]) =>
                handleFilterChange("price", value.toString())
              }
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm ">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <Label>Categories</Label>
            <ScrollArea className="h-[200px] mt-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox
                    id={`category-${category.name}`}
                    checked={optimisticFilters.categories
                      ?.split(",")
                      .includes(category.name)}
                    onCheckedChange={() => handleCategoryToggle(category.name)}
                  />
                  <Label htmlFor={`category-${category.name}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>Sorting</div>
          <div className="p-2 space-y-4"></div>
        </div>
      </ScrollArea>

      {Object.keys(optimisticFilters).length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleClearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}

interface FilterProps {
  categories: Category[]
}

export function FilterFallback({ categories }: FilterProps) {
  return (
    <FilterBase categories={categories} searchParams={new URLSearchParams()} />
  )
}

export function Filter({ categories }: FilterProps) {
  const searchParams = useSearchParams()

  return <FilterBase categories={categories} searchParams={searchParams} />
}
