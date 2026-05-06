import type {
  Category,
  Product,
  ProductsResponse,
  SortField,
  SortOrder,
} from "@/types"

const BASE_URL = "https://dummyjson.com"

interface ListParams {
  limit?: number
  skip?: number
  sortBy?: SortField
  order?: SortOrder
}

interface SearchParams {
  limit?: number
  skip?: number
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  getProducts: ({ limit = 30, skip = 0, sortBy, order }: ListParams = {}) => {
    const params = new URLSearchParams()
    params.set("limit", String(limit))
    params.set("skip", String(skip))
    if (sortBy) params.set("sortBy", sortBy)
    if (order) params.set("order", order)
    return request<ProductsResponse>(`/products?${params.toString()}`)
  },

  getProduct: (id: number | string) => request<Product>(`/products/${id}`),

  searchProducts: (
    query: string,
    { limit = 30, skip = 0 }: SearchParams = {},
  ) =>
    request<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    ),

  getCategories: () => request<Category[]>("/products/categories"),

  getCategoryList: () => request<string[]>("/products/category-list"),

  getByCategory: (
    category: string,
    { limit = 30, skip = 0, sortBy, order }: ListParams = {},
  ) => {
    const params = new URLSearchParams()
    params.set("limit", String(limit))
    params.set("skip", String(skip))
    if (sortBy) params.set("sortBy", sortBy)
    if (order) params.set("order", order)
    return request<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}?${params.toString()}`,
    )
  },
}
