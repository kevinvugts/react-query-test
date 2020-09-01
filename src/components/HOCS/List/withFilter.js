import React from 'react'

// Dependencies

import { useParams } from 'react-router-dom'

// Internal
import { useCategory } from '@utils/categories'
import { ListHeader, ListFilter } from '@components/List/elements'

const defaultProps = {
  title: 'test',
}

/*
  This is a HOC which makes it easier show a loader indicator while
  a promise is in progress.
*/
function withFilter(WrappedComponent, properties) {
  return (instanceProps) => {
    const { categoryId } = useParams()
    const { articles, category, error, isError } = useCategory(categoryId) // TODO - Should use another hook specifically for searching

    let props = { ...instanceProps, ...defaultProps }

    if (isError) {
      return <span>Error: {error.message}</span>
    }

    return (
      <>
        {/* Optionally render a ListHeader */}
        {properties.listHeader && <ListHeader category={category} />}

        <ListFilter />

        {/* Render Component */}
        <WrappedComponent
          {...props}
          filteredData={articles}
          category={category}
        ></WrappedComponent>
      </>
    )
  }
}

export default withFilter
