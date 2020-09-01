import React from 'react'

// Dependencies
import { Container, Row, Col, Button } from 'react-bootstrap'

// Internal
import { useUpdateProfile, useProfile } from '@utils/profile'

const ProfileScreen = () => {
  // const { user } = useAuth()

  const { profile } = useProfile()
  const [mutate, { error, isError }] = useUpdateProfile(profile.id)
  const [email, setEmail] = React.useState('')

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Container className="wrapper-container categories-item-container text-white">
      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Huidig e-mailadres</p>
          <p>{profile.email}</p>
        </Col>

        <Col>
          <p className="font-weight-bold m-0">Nieuw e-mailadres</p>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            disabled={!email}
            onClick={() => mutate({ email })}
            className="bg-transparent border-0 text-white"
          >
            Wijzig <i className="fa fa-chevron-right pl-2" />
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
