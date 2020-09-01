import React, { Suspense, lazy } from 'react'

// Internatiolization
import { withTranslation } from 'react-i18next'

// Screens
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app')
)
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

// Components
import { FullPageSpinner } from '@components/lib'

// Utils
import { useAuth } from '@context/auth'

const App = (props) => {
  const { user } = useAuth()

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export default withTranslation()(App)
