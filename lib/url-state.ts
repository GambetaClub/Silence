export interface SearchParams {
  search?: string;
  price?: string;
  categories?: string;
  page?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchParams {
  return {
    search: typeof params.search === 'string' ? params.search : undefined,
    price: typeof params.search === 'string' ? params.search : undefined,
    categories: typeof params.categories === 'string' ? params.categories : undefined,
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