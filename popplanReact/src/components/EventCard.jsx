import Card from "react-bootstrap/Card";
/* eslint-disable react/prop-types */
function EventCard({ event }) {
  return (
    <a href={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card style={{ width: "18rem", margin: "0.5rem 0" }}> {/* 增加上下間隙 */}
        <Card.Img variant="top" src={event.image} />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default EventCard;
