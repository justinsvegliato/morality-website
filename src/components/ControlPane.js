import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class ControlPane extends React.Component {
  render() {
    const onChange = (event) => this.props.updateEthics(event.target.value);

    return (
      <Alert variant={'light'}>
        <Col xs={{span: 3, offset: 9}}>
          <Form>
            <Form.Control as="select" value={this.props.settings.ethics} onChange={onChange}>
              <option value="forbiddenStateEthics">Forbidden State Ethics</option>
              <option value="normBasedEthics">Norm-Based Ethics</option>
            </Form.Control>
          </Form>
        </Col>
      </Alert>
    );
  }
}
