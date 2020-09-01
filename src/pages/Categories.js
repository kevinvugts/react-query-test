import React from 'react'

// Internal
import { List as CategoryList } from '@components'
import withReactQueryDevTools from '@components/HOCS/Debugging/withReactQueryDevTools.js'
import { useCategories } from '@utils/categories'

function CategoriesScreen(props) {
  const { categories, error, isError } = useCategories()

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return <CategoryList data={categories} listTitle="Categorieën" />
}

export default withReactQueryDevTools(CategoriesScreen)
