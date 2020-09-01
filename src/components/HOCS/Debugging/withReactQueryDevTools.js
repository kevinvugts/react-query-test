import React from 'react'

// Dependencies
import { ReactQueryDevtools } from 'react-query-devtools'

const defaultProps = {
  title: 'test',
}

/*
  This is a HOC which makes it easier show a loader indicator while
  a promise is in progress.
*/
function withReactQueryDevTools(WrappedComponent, properties) {
  return (instanceProps) => {
    let props = { ...instanceProps, ...defaultProps }

    return (
      <>
        {/* Render Component */}
        <WrappedComponent {...props}></WrappedComponent>
        <ReactQueryDevtools />
      </>
    )
  }
}

export default withReactQueryDevTools
