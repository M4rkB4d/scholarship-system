import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

const Announcement = () => {
    var items = [
      {
          name: "Test Announcement #1",
          description: "On working progress"
      },
      {
          name: "Test Announcement #2",
          description: "On working progress"
      },
      {
          name: "Test Announcement #3",
          description: "On working progress"
      }
  ]

  return (
      <Carousel>
          {
              items.map( (item, i) => <Item key={i} item={item} /> )
          }
      </Carousel>
  )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Announcement
