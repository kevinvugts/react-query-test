import React from 'react'

function FullPageSpinner() {
  return (
    <div
      style={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      spinner hier ...
    </div>
  )
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      style={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... Er is een probleem opgetreden. Probeer de app te herladen.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

function ErrorMessage({ error, variant = 'stacked', ...props }) {
  function generateErrorMessageComponent() {
    return Array.isArray(error) ? (
      error.map((error, key) => (
        <p style={{ color: 'red' }} key={key}>
          {error}
        </p>
      ))
    ) : (
      <p style={{ color: 'red' }}>{error}</p>
    )
  }

  return (
    <div
      role="alert"
      style={{
        color: 'red',
        //errorMessageVariants[variant]
      }}
      {...props}
    >
      <span>Er heeft zich een probleem voortgedaan: </span>
      <pre
        style={{
          whiteSpace: 'break-spaces',
          margin: '0',
          marginBottom: -5,
          display: 'block',
          //errorMessageVariants[variant],
        }}
      >
        {generateErrorMessageComponent()}
      </pre>
    </div>
  )
}

export { FullPageErrorFallback, FullPageSpinner, ErrorMessage }
