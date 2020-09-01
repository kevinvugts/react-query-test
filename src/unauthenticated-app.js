import React from 'react'

// Dependencies
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Fade } from 'react-awesome-reveal'

// Internal
import logo from '@public/assets/logo.svg'
import { useAuth } from '@context/auth'
import { useAsync } from '@utils/hooks'
import { ErrorMessage } from '@components/lib'
import { withSplashScreen, CustomModal } from '@components'

function LoginForm({ onSubmit, submitButton, setShowModal }) {
  const { isLoading, isError, error, run } = useAsync()
  function handleSubmit(event) {
    event.preventDefault()
    const { email, password } = event.target.elements

    run(
      onSubmit({
        email: email.value,
        password: password.value,
      })
    )
  }

  return (
    <Form id="login-form" className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__heading">Login</h2>
      <hr />

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoComplete="email"
          id="email"
          name="email"
          type="email"
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Wachtwoord</Form.Label>
        <Form.Control
          autoComplete="current-password"
          id="password"
          name="password"
          type="password"
          required={true}
        />
      </Form.Group>

      <div className="container__button">
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <i className="fas fa-spinner fa-spin ml-1"></i> : null
        )}
      </div>

      <Form.Text
        onClick={() => setShowModal(true)}
        className="text-center"
        id="forgotPassword"
        as="p"
      >
        Wachtwoord vergeten?
      </Form.Text>

      {isError ? <ErrorMessage error={error} /> : null}
    </Form>
  )
}

function PasswordResetModal({
  onSubmit,
  submitButton,
  showModal,
  setShowModal,
}) {
  const { isLoading, isError, error, isSuccess, run } = useAsync()
  function handleSubmit(event) {
    event.preventDefault()
    const { email } = event.target.elements

    run(
      onSubmit({
        email: email.value,
      })
    )
  }

  function renderResetForm() {
    return (
      <Form
        id="password-reset-form"
        className="password-reset-form"
        onSubmit={handleSubmit}
      >
        <h2 className="password-reset-form__heading text-center mb-3">
          Vraag een nieuw wachtwoord aan
        </h2>

        <Form.Text className="text-center mb-3" id="instructions" as="p">
          Vul je email in en we sturen je een link waarmee je een nieuw
          wachtwoord kunt instellen
        </Form.Text>

        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoComplete="email"
            id="email"
            name="email"
            type="email"
            required={true}
          />
        </Form.Group>

        <div className="container__button">
          {React.cloneElement(
            submitButton,
            { type: 'submit' },
            ...(Array.isArray(submitButton.props.children)
              ? submitButton.props.children
              : [submitButton.props.children]),
            isLoading ? <i className="fas fa-spinner fa-spin ml-1"></i> : null
          )}
        </div>

        {isError ? <ErrorMessage error={error} /> : null}
      </Form>
    )
  }

  function renderConfirmation() {
    return (
      <>
        <h2 className="password-reset-form__heading text-uppercase text-center mb-3">
          We hebben je een link gestuurd
        </h2>

        <p>
          We hebben een link naar je email gestuurd. Kijk voor de zekerheid ook
          in je spam folder
        </p>

        <Button
          onClick={() => setShowModal(false)}
          variant="primary"
          type="button"
          className="mb-5"
        >
          Inloggen
        </Button>
      </>
    )
  }

  return (
    <CustomModal
      id="password-reset-modal"
      showModal={showModal}
      onHide={() => setShowModal(false)}
      body={isSuccess ? renderConfirmation() : renderResetForm()}
    />
  )
}

function UnauthenticatedApp() {
  const [showModal, setShowModal] = React.useState(false)
  const { login, resetPassword } = useAuth()

  return (
    <div className="splash">
      {/* Logo */}
      <img src={logo} className="mb-6 logo appended" />

      {/* Main */}
      <Container className="wrapper-container px-3">
        <Fade triggerOnce direction="up">
          <Row className="justify-content-center">
            <Col xs={12} sm={10}>
              <LoginForm
                setShowModal={setShowModal}
                onSubmit={login}
                submitButton={
                  <Button variant="primary" type="submit">
                    Inloggen
                  </Button>
                }
              />
            </Col>
          </Row>
        </Fade>
      </Container>

      {/* Modal */}
      <PasswordResetModal
        setShowModal={setShowModal}
        showModal={showModal}
        onSubmit={resetPassword}
        submitButton={
          <Button variant="primary" type="submit">
            Link versturen
          </Button>
        }
      />
    </div>
  )
}

export default withSplashScreen(UnauthenticatedApp)
