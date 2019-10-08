import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default class ControlPane extends React.Component {
  getToleranceForm(ethics, normBasedEthics, updateTolerance) {
    const onChange = (event) => updateTolerance(event.target.value);
    if (ethics === 'normBasedEthics') {
      return (
        <Col xs={{span: 2, offset: 5}}>
          <Form.Control as="select" value={normBasedEthics.tolerance} onChange={onChange}>
            <option value="0">No Tolerance</option>
            <option value="3">Low Tolerance</option>
            <option value="7">Medium Tolerance</option>
            <option value="15">High Tolerance</option>
          </Form.Control>
        </Col>
      );
    }
    return null;
  }

  render() {
    const onChange = (event) => this.props.updateEthics(event.target.value);
    const onClick = () => {
      this.props.clearGridWorld();
      this.props.clearForbiddenStates();
      this.props.clearNorms();
    };

    const toleranceForm = this.getToleranceForm(this.props.settings.ethics, this.props.normBasedEthics, this.props.updateTolerance);

    return (
      <Alert variant={'light'}>
        <Row>
          <Col xs={{span: 3}}>
            <Form>
              <Form.Control as="select" value={this.props.settings.ethics} onChange={onChange}>
                <option value="forbiddenStateEthics">Forbidden State Ethics</option>
                <option value="normBasedEthics">Norm-Based Ethics</option>
              </Form.Control>
            </Form>
          </Col>
          <Col xs={{span: 2}}>
            <Button variant="danger" onClick={onClick}>Clear</Button>
          </Col>
          {toleranceForm}
        </Row>
      </Alert>
    );
  }
}

ControlPane.propTypes = {
  settings: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  updateEthics: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
