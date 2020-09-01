import React from 'react'

// Dependencies
import * as Sentry from '@sentry/react'
import { useLocation } from 'react-router-dom'

// Internal
import { Header } from '@core/Header'
import { errorDialogOptions } from '@seed'
import { AppRoutes } from './core/Router'

function ErrorFallback({ error }) {
  return <p>error message component here</p>
}

function AuthenticatedApp() {
  const location = useLocation()
  const [actionType, setActionType] = React.useState('maps')

  React.useEffect(() => {
    if (
      location.pathname !== '/' &&
      location.pathname !== '/categories' &&
      location.pathname !== '/profiel'
    ) {
      setActionType('back')
      return
    }

    if (location.pathname === '/profiel') {
      setActionType('close')
      return
    }

    setActionType('maps')
  }, [location])

  return (
    <Sentry.ErrorBoundary
      fallback={ErrorFallback}
      showDialog
      dialogOptions={errorDialogOptions}
    >
      <Header actionType={actionType} />

      <main id="authenticated-app-main">
        <Sentry.ErrorBoundary
          fallback={ErrorFallback}
          showDialog
          dialogOptions={errorDialogOptions}
        >
          <AppRoutes />
        </Sentry.ErrorBoundary>
      </main>
    </Sentry.ErrorBoundary>
  )
}

export default AuthenticatedApp
