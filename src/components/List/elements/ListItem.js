import React from 'react'

// Dependencies
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'

// Internal
import ListItemImage from './ListItemImage'

const ListItem = ({ item, template }) => {
  // it should ideally allow users to pass HOCS withAnimation and withLink in order to configure the list item
  return (
    <Fade triggerOnce cascade>
      <Link to={`/categories/${item.id}/articles`}>
        <ListItemImage
          data={item}
          index={0}
          format={false}
          className="categories-item-container__image"
          template={template}
        />
      </Link>
    </Fade>
  )
}

export default ListItem
