import React from 'react'
import { queryCache } from 'react-query'
import * as auth from '../../auth-provider'
import { client } from '@utils/api-client'
import { useAsync } from '@utils/hooks'
import { FullPageSpinner, FullPageErrorFallback } from '@components/lib'

// Bootstrap / Load the initial data from strapi here
async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()

  // get profile of the user/me and save to user object along with token
  if (token) {
    const userdata = await client('users/me', { token })
    userdata.jwt = token

    // we could bootstrap / prefetch data for categories which is the inital route
    queryCache.setQueryData('profile', userdata, {
      staleTime: 50000,
    })

    user = userdata
  }

  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    (form) => auth.login(form).then((user) => setData(user)),
    [setData]
  )
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => setData(user)),
    [setData]
  )
  const resetPassword = React.useCallback(
    (form) => auth.resetPassword(form).then((token) => setData()),
    [setData]
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({ user, login, resetPassword, logout, register }),
    [login, resetPassword, logout, register, user]
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const { user } = useAuth()

  const token = user?.jwt
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  )
}

export { AuthProvider, useAuth, useClient }
