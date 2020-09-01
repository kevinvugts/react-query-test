import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { ReactQueryConfigProvider } from 'react-query'

// Contenx
import { AuthProvider } from './auth'
import AppContext from './app'
import * as Sentry from '@sentry/react'

// Seed
import { errorDialogOptions } from '@seed'

// utils
import { LocalStorageWorker } from '@utils'

const FallbackComponent = () => (
  <p>
    Er heeft zich een probleem voorgedaan. Ons team is op de hoogte gesteld van
    het probleem.
  </p>
)

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

function AppProviders({ children }) {
  const lsw = new LocalStorageWorker()

  return (
    <Sentry.ErrorBoundary
      fallback={FallbackComponent}
      showDialog
      dialogOptions={errorDialogOptions}
    >
      <ReactQueryConfigProvider config={queryConfig}>
        <BrowserRouter history={createBrowserHistory()}>
          <AuthProvider>
            <AppContext.Provider value={{ lsw }}>
              {children}
            </AppContext.Provider>
          </AuthProvider>
        </BrowserRouter>
      </ReactQueryConfigProvider>
    </Sentry.ErrorBoundary>
  )
}

export default AppProviders
