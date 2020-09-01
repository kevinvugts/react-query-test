import React, { Component } from 'react'

// Bootstrap
import { Button, Container, Row, Col } from 'react-bootstrap'

// Animation
import { Fade } from 'react-awesome-reveal'

// Assets
import logo from '@public/assets/logo.svg'

function SplashScreen({ onClick }) {
  return (
    <Container className="wrapper-container px-3 splash">
      <Fade triggerOnce direction="up">
        <Row className="justify-content-center text-center">
          <Col xs={12} sm={10}>
            <img src={logo} className="mb-6" />
            <h2>DE MEYER BEHEER HORECA TRAINING</h2>
            <hr />
            <p className="mb-5">
              Deze app zorgt ervoor dat jij altijd je weg binnen de horeca kunt
              vinden. Alle kneepjes van het vak staan in deze app. Het maakt
              niet uit wat je moet doen, wij zorgen ervoor dat je het goed kunt
              doen.
            </p>

            <Button onClick={onClick} variant="primary">
              Ga verder
            </Button>
          </Col>
        </Row>
      </Fade>
    </Container>
  )
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
      }
    }

    render() {
      // while first login, show splash screen
      if (this.state.loading)
        return (
          <SplashScreen onClick={() => this.setState({ loading: false })} />
        )

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withSplashScreen
