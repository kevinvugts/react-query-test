import React from 'react'

// Dependencies
import { Container, Row, Col } from 'react-bootstrap'

// Internal
import { ListItem } from './elements'

const defaultProps = {
  template: 'category',
  listTitle: null,
}

const List = (instanceProps) => {
  // It should parse the right data depending on the endpoint / react-query config ✅
  // It should render a list of items with the right template ✅

  // It should optionally show a ListHeader component ✅

  // It should show loading states when the data is not ready yet -> (will resolve automatically with internals of react-query) ✅
  // It should show an error when this component did not load properly ✅
  // It should optionally show a ListFilter component depending on the configuration -> (probably should go into a HOC instead) ✅
  // It should optionally render with search depending on the configuration (probably should go into a HOC instead)

  // Link to the right page if needed. Currently we assume that Link is always necessary

  const props = { ...defaultProps, ...instanceProps }
  function renderListTitle() {
    return (
      <>
        <h2 className="text-uppercase text-white">{props.listTitle}</h2>
        <hr className="hr-dashed mb-3" />
      </>
    )
  }

  return (
    <Container className="wrapper-container categories-item-container">
      <Row className="justify-content-center">
        <Col>
          {/* Optionally render a List Title with <hr /> divider */}
          {props.listTitle && renderListTitle()}

          {/* Render List Items */}
          {props.data.length &&
            props.data.map((item, key) => (
              <ListItem template={props.template} item={item} key={key} />
            ))}
        </Col>
      </Row>
    </Container>
  )
}

export default List
