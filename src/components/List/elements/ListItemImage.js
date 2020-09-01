import React from 'react'

// Bootstrap
import { Row, Col, Button } from 'react-bootstrap'

// Utils
import { getImageURL } from '@utils'

// Assets
import playIcon from '@public/assets/play-icon.svg'

const defaultProps = {
  images: [],
  index: 0,
  format: false,
  className: '',
  alt: '',
}

/**
 * Render the Image component connected to a Strapi image object.
 * @constructor
 * @param {object} props                    - The properties object.
 * @param {(array|object)} props.images     - An array of images or a single Image object.
 * @param {number} [props.index]            - Optionally the selected index of the props.images array.
 * @param {(string|boolean)} [props.format] - Optional thumbnail format to display. Fallback is the original image.
 * @param {(string)} [props.className]      - Optional className.
 * @param {(string)} [props.alt]            - Optional alt text.
 * @param {(string)} [props.template]       - Template to render (article, category, video, image)
 * @return {html}                           - The html <img /> tag.
 */
const ListItemImage = (instanceProps) => {
  const props = { ...defaultProps, ...instanceProps }
  const { category_image, title, subtitle } = props.data

  // TODO: refactoring
  const Category = ({ title }) => (
    <Row
      className="align-items-center w-100"
      style={{
        position: 'absolute',
        bottom: 10,
        color: 'white',
      }}
    >
      <Col xs={10}>
        <h2 className="m-0">{title}</h2>
      </Col>
      <Col xs={2} className="d-flex justify-content-end">
        <Button className="btn bg-transparent border-0 text-white">
          <i style={{ fontSize: 18 }} className="fa fa-chevron-right ml-1" />
        </Button>
      </Col>
    </Row>
  )

  const Article = ({ title, subTitle }) => (
    <Row
      className="align-items-center w-100"
      style={{
        position: 'absolute',
        bottom: 10,
        color: 'white',
      }}
    >
      <Col>
        <h5 className="m-0 text-uppercased">{subTitle}</h5>
        <h2 className="m-0 text-uppercased">{title}</h2>
      </Col>
    </Row>
  )

  const Video = ({ title }) => (
    <>
      <Button
        className="btn border-0"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'transparent',
        }}
      >
        <img src={playIcon} />
      </Button>
      <Row
        className="align-items-center w-100"
        style={{
          position: 'absolute',
          bottom: 10,
          color: 'white',
        }}
      >
        <Col xs={12}>
          <h2 className="m-0 text-uppercased">{title}</h2>
        </Col>
      </Row>
    </>
  )

  const Image = ({ title }) => (
    <Row
      className="align-items-center w-100"
      style={{
        position: 'absolute',
        bottom: 10,
        color: 'white',
      }}
    >
      <Col xs={12}>
        <h2 className="m-0 text-uppercased">{title}</h2>
      </Col>
    </Row>
  )

  const renderContents = (title, subTitle) => {
    switch (props.template) {
      case 'image':
        return <Image title={title} />
      case 'video':
        return <Video title={title} />
      case 'category':
        return <Category title={title} />
      case 'article':
        return <Article title={title} subTitle={subTitle} />
      default:
        return <Category title={title} />
    }
  }

  return (
    <div className="image-container">
      <img
        src={getImageURL(category_image, props.index, props.format)}
        className={props.className}
        alt={props.alt}
      />

      {renderContents(title, subtitle)}
    </div>
  )
}

export default ListItemImage
