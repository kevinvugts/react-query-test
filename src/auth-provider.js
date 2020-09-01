const localStorageKey = '__auth_provider_token__'

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse(user) {
  window.localStorage.setItem(localStorageKey, user.jwt)
  return user
}

function login({ email, password }) {
  return client('auth/local', { identifier: email, password }).then(
    handleUserResponse
  )
}

function register({ email, password }) {
  return client('auth/local/register', {
    email,
    username: email,
    password,
  }).then(handleUserResponse)
}

function resetPassword({ email }) {
  return client('auth/forgot-password', {
    email,
    //url: `${APP_CONFIG.appHost}/auth/new`, // needs to be changed
    url: 'http://localhost:3001/auth/new',
  }).then((res) => res)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const authURL = APP_CONFIG.apiHost

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        if (response.status === 429) {
          return Promise.reject(
            'Te veel mislukte pogingen. Probeer het later nog eens.'
          )
        }

        return Promise.reject(data)
      }
    })
}

export { getToken, login, register, resetPassword, logout, localStorageKey }
