export interface SearchParams {
  search?: string;
  price?: string;
  categories?: string;
  priceOrd?: string
  page?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchParams {
  return {
    search: typeof params.search === 'string' ? params.search : undefined,
    price: typeof params.price === 'string' ? params.price : undefined,
    categories: typeof params.categories === 'string' ? params.categories : undefined,
    priceOrd: typeof params.priceOrd === 'string' ? params.priceOrd : undefined,
    page: typeof params.page === 'string' ? params.page : undefined,
  };
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}