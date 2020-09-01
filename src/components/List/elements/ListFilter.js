import React from 'react'

// Dependencies
import { Row, Col, Button } from 'react-bootstrap'

const ListFilter = () => {
  const [activeButton, setActiveButton] = React.useState('a')

  function filterResultsForActiveFilter(name) {
    console.log('Fetch query with active filter name using react-query')
    setActiveButton(name)
  }

  return (
    <Row
      noGutters
      className="pt-4 filter-container"
      style={{ flexWrap: 'nowrap', overflowX: 'scroll' }}
    >
      <Col xs="auto" className="px-1">
        <Button
          onClick={() => filterResultsForActiveFilter('a')}
          active={activeButton === 'a'}
        >
          SOP's MIJN VESTIGING
        </Button>
      </Col>

      <Col xs="auto" className="px-1">
        <Button
          onClick={() => filterResultsForActiveFilter('b')}
          active={activeButton === 'b'}
        >
          ALGEMENE SOP'S
        </Button>
      </Col>

      <Col xs="auto" className="px-1">
        <Button
          onClick={() => filterResultsForActiveFilter('c')}
          active={activeButton === 'c'}
        >
          INNER CIRCLE
        </Button>
      </Col>
    </Row>
  )
}

export default ListFilter
