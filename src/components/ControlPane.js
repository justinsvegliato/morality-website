import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default class ControlPane extends React.Component {
  render() {
    const onChange = (event) => this.props.updateEthics(event.target.value);
    const onClick = () => {
      this.props.clearGridWorld();
      this.props.clearForbiddenStates();
      this.props.clearNorms();
    };

    return (
      <Alert variant={'light'}>
        <Row>
          <Col xs={{span: 3}}>
            <Button variant="danger" onClick={onClick}>Clear</Button>
          </Col>
          <Col xs={{span: 3, offset: 6}}>
            <Form>
              <Form.Control as="select" value={this.props.settings.ethics} onChange={onChange}>
                <option value="forbiddenStateEthics">Forbidden State Ethics</option>
                <option value="normBasedEthics">Norm-Based Ethics</option>
              </Form.Control>
            </Form>
          </Col>
        </Row>
      </Alert>
    );
  }
}

ControlPane.propTypes = {
  updateEthics: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired
};
