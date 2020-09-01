import React from 'react'

// Dependencies
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Internal
import { useProfile } from '@utils/profile'

const ProfileScreen = () => {
  const { profile, error, isError } = useProfile()
  const { fullName, email, phonenumber } = profile

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Container className="wrapper-container categories-item-container text-white">
      <Row className="my-3">
        <Col className="d-flex justify-content-center">
          <h2>{fullName}</h2>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Email</p>
          <p>{email}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to="/profiel/verander-email">
            <Button className="bg-transparent border-0 text-white">
              Wijzig <i className="fa fa-chevron-right pl-2" />
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Telefoonnummer</p>
          <p>{phonenumber}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="bg-transparent border-0 text-white">
            Wijzig <i className="fa fa-chevron-right pl-2" />
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Vestiging</p>
          <p>locaties hier tonen...</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="bg-transparent border-0 text-white">
            Wijzig <i className="fa fa-chevron-right pl-2" />
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Wachtwoord</p>
          <p>*******************</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="bg-transparent border-0 text-white">
            Wijzig <i className="fa fa-chevron-right pl-2" />
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={7}>
          <p className="font-weight-bold m-0">Taal:</p>
          <p>Nederlands</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="bg-transparent border-0 text-white">
            Wijzig <i className="fa fa-chevron-right pl-2" />
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
