import { useQuery, queryCache } from 'react-query'
import { useClient } from '@context/auth'
import logoPlaceholder from '@public/assets/logo.svg'

const skeletonFormat = {
  title: 'Laden...',
  category_image: [{ url: logoPlaceholder }],
  isLoading: true,
  error: null,
  isError: false,
  articles: [],
  category: {
    title: 'Categorie laden...',
    category_image: [{ url: logoPlaceholder }],
    description:
      'A handcrafted, small-batch, artisinal pour-over version of the classic lorem ipsum generator.',
  },
}

const skeletonData = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-category-${index}`,
  ...skeletonFormat,
}))

const categoryQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const getCategoriesConfig = (client) => ({
  queryKey: 'categories',
  queryFn: () => client('categories').then((res) => res),
  config: {
    onSuccess(categories) {
      for (const category of categories) {
        queryCache.setQueryData(
          ['category', { categoryId: category.id }],
          category,
          categoryQueryConfig
        )
      }
    },
  },
})

// Get All Categories
function useCategories() {
  const client = useClient()
  const result = useQuery(getCategoriesConfig(client))

  return { ...result, categories: result.data ?? skeletonData }
}

// Get Category By Its ID
function useCategory(categoryId) {
  const client = useClient()
  const result = useQuery({
    queryKey: ['category', { categoryId }],
    queryFn: () => client(`categories/${categoryId}`).then((res) => res),
    ...categoryQueryConfig,
  })

  const { data, ...response } = result

  if (data && data[0]) {
    let { articles, locations, ...category } = data[0]

    return { articles: data[0].articles, category, ...response }
  } else if (data && typeof data === 'object') {
    let { articles, locations, ...category } = data

    return { articles, category, ...response }
  } else {
    return {
      articles: skeletonData,
      category: skeletonFormat.category,
      ...result,
    }
  }
}

function setQueryDataForCategory(category) {
  queryCache.setQueryData({
    queryKey: ['category', { categoryId: category.id }],
    queryFn: category,
    ...categoryQueryConfig,
  })
}

export { useCategory, useCategories, setQueryDataForCategory }
