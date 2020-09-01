import React from 'react'

// Dependencies
import { Row, Col } from 'react-bootstrap'

// Internal
import { getImageURL } from '@utils/strapi'

const ListHeader = ({ category, ...props }) => {
  return (
    <Row noGutters>
      <Col xs={12}>
        <div className="image-container">
          <img
            src={getImageURL(category.category_image, 0, false)}
            // className={props.className}
            // alt={props.alt}
            style={{
              objectFit: 'cover',
              width: '100%',
            }}
          />

          <Row
            style={{
              position: 'absolute',
              top: 30,
              left: 20,
              color: 'white',
            }}
          >
            <Col>
              <h2>{category.title}</h2>
              <p style={{ maxWidth: '75vw' }}>{category.description}</p>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default ListHeader
