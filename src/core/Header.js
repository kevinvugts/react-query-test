import React from 'react'

// Dependencies
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Assets
import brandLogo from '@public/assets/brand-logo.svg'
import profileIcon from '@public/assets/profile-icon.svg'
import mapIcon from '@public/assets/map-icon.svg'

export const Header = ({ actionType }) => {
  let navigate = useNavigate()

  function renderBackButton() {
    return (
      <Row noGutters>
        <Col>
          <Button
            className="btn bg-transparent p-0 border-0 text-white"
            onClick={() => navigate(-1)}
          >
            <i style={{ fontSize: 18 }} className="fa fa-chevron-left mr-1" />
            Terug
          </Button>
        </Col>
      </Row>
    )
  }

  function renderCloseButton() {
    return (
      <Row noGutters>
        <Col>
          <Button
            className="btn bg-transparent p-0 border-0 text-white"
            onClick={() => navigate(-1)}
          >
            <i style={{ fontSize: 18 }} className="fa fa-times mr-1" />
            Sluiten
          </Button>
        </Col>
      </Row>
    )
  }

  function renderMaps() {
    return (
      <Row noGutters>
        <Col>
          <img src={mapIcon} />
        </Col>
        <Col style={{ fontFamily: 'Lora', color: 'white' }}>Plattegrond</Col>
      </Row>
    )
  }

  function renderActions() {
    switch (actionType) {
      case 'back':
        return renderBackButton()
      case 'close':
        return renderCloseButton()

      case 'maps':
        return renderMaps()

      default:
        return renderMaps()
    }
  }

  return (
    <header className="toolbar">
      <Container className="h-100">
        <Row className="h-100 align-items-center">
          <Col xs={4} className="pr-0">
            {/*showBackButton ? renderBackButton() : renderMaps() */}

            {renderActions()}
          </Col>
          <Col xs={5} className="p-0 justify-content-center d-flex">
            <Link to="/categories">
              <img src={brandLogo} />
            </Link>
          </Col>

          <Col className="d-flex justify-content-end" xs={3}>
            <Link to="/profiel">
              <img src={profileIcon} />
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
