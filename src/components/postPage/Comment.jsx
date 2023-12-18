import Accordion from 'react-bootstrap/Accordion';

function Comment({author, text, id}) {
  return (
    <Accordion style={{
        width: '98%', marginLeft: '1%'
    }}>
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{author}</Accordion.Header>
        <Accordion.Body>
          {text}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Comment;