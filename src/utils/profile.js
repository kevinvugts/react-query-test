import { useQuery, useMutation, queryCache, useQueryCache } from 'react-query'
import { useClient } from '@context/auth'
import logoPlaceholder from '@public/assets/logo.svg'

const skeletonFormat = {
  email: 'example@example.nl',
  id: '5f3234449e540004499fcf3c83',
  locations: [],
  username: 'example username',
  fullName: 'Example guy',
  phonenumber: '06-12345678',
  avatar: [{ url: logoPlaceholder }],
  isLoading: true,
  error: null,
  isError: false,
}

const profileQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const getProfileConfig = (client) => ({
  queryKey: 'profile',
  queryFn: () => client('users/me').then((res) => res),
  config: {
    onSuccess(profile) {
      queryCache.setQueryData('profile', profile, profileQueryConfig)
    },
  },
})

// Get All Categories
function useProfile() {
  const client = useClient()
  const result = useQuery(getProfileConfig(client))

  if (result.data) {
    result.data.fullName = `${result.data.firstName} ${result.data.lastName}`
  }

  return { ...result, profile: result.data ?? skeletonFormat }
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => {
    console.log('INVALIDATE PROFILE QUERIES')
    queryCache.invalidateQueries('profile')
  },
}

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData('profile')

  // update cache for profile
  queryCache.setQueryData('profile', (old) =>
    Object.assign({}, { ...newItem, ...old })
  )

  return () => queryCache.setQueryData('profile', previousItems)
}

function useUpdateProfile(userId, options) {
  const client = useClient()

  return useMutation(
    (updates) =>
      client(`users/${userId}`, {
        method: 'PUT',
        data: updates,
      }),
    {
      //onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    }
  )
}

export { useProfile, useUpdateProfile }
