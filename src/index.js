import React from 'react'
import ReactDOM from 'react-dom'

// Dependencies
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn:
    'https://8aafded624a04e06a3ccf33bb8ccfc33@o226067.ingest.sentry.io/5384447',
  environment: APP_CONFIG.appEnvironment,
})

// Internal
import './index.scss'
import { ScrollToTop } from '@components'
import App from './app'
import AppProviders from '@context'

ReactDOM.render(
  <AppProviders>
    <ScrollToTop />
    <App />
  </AppProviders>,
  document.getElementById('app')
)
