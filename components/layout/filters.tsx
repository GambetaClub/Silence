'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input'; // For the name input
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { parseSearchParams, SearchParams, stringifySearchParams } from '@/lib/url-state';

const CATEGORIES = [
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  // Add more categories as needed
];

interface FilterProps {
  searchParams: URLSearchParams;
}

function FilterBase({ searchParams }: FilterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialFilters = parseSearchParams(Object.fromEntries(searchParams));
  const [optimisticFilters, setOptimisticFilters] =
    useOptimistic<SearchParams>(initialFilters);

  const updateURL = (newFilters: SearchParams) => {
    const queryString = stringifySearchParams(newFilters);
    router.push(queryString ? `/?${queryString}` : '/');
  };

  const handleFilterChange = (
    filterType: keyof SearchParams,
    value: string | undefined
  ) => {
    startTransition(() => {
      const newFilters = { ...optimisticFilters, [filterType]: value };
      setOptimisticFilters(newFilters);
      updateURL(newFilters);
    });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = optimisticFilters.categories?.split(',') || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((cat) => cat !== category)
      : [...currentCategories, category];

    handleFilterChange('categories', newCategories.join(','));
  };

  const handleClearFilters = () => {
    startTransition(() => {
      setOptimisticFilters({});
      router.push('/');
    });
  };

  return (
    <div
      data-pending={isPending ? '' : undefined}
      className="flex-shrink-0 flex flex-col h-full rounded-lg"
    >
      <ScrollArea className="flex-grow">
        <div className="p-2 space-y-4">

          {/* Name Filter */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={optimisticFilters.name || ''}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Enter name"
              className="mt-2"
            />
          </div>

          {/* Price Filter */}
          <div>
            <Label htmlFor="price-range">Price Range</Label>
            <Slider
              id="price-range"
              min={0}
              max={1000}
              step={10}
              value={[Number(optimisticFilters.price) || 1000]}
              onValueChange={([value]) =>
                handleFilterChange('price', value.toString())
              }
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm ">
              <span>$0</span>
              <span>{optimisticFilters.price || 1000}</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <Label>Categories</Label>
            <ScrollArea className="h-[200px] mt-2">
              {CATEGORIES.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={optimisticFilters.categories?.split(',').includes(category.value)}
                    onCheckedChange={() => handleCategoryToggle(category.value)}
                  />
                  <Label htmlFor={`category-${category.value}`}>
                    {category.label}
                  </Label>
                </div>
              ))}
            </ScrollArea>
          </div>
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
  );
}

export function FilterFallback() {
  return <FilterBase searchParams={new URLSearchParams()} />;
}

export function Filter() {
  const searchParams = useSearchParams();
  return <FilterBase searchParams={searchParams} />;
}
