import React from 'react'
import Card from 'react-bootstrap/Form'

const CardDisplay = ({ card }) => (

  <div>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Subtitle>{card.category}</Card.Subtitle>
        <Card.Text>
          {card.address}
          {card.phone}
          {card.email}
          {card.url}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
)

export default CardDisplay
