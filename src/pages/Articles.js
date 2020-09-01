import React from 'react'

// Internal
import { List as ArticleList } from '@components'
import withFilter from '@components/HOCS/List/withFilter'

function ArticlesScreen(props) {
  const { filteredData, category } = props

  return (
    <ArticleList data={filteredData} category={category} template="article" />
  )
}

export default withFilter(ArticlesScreen, { listHeader: true })
