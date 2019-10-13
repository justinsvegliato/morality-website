import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

function getTotalValue(values) {
  let total = 0;

  for (const value of Object.values(values)) {
    total += value;
  }

  return total;
}

export default class ControlPanel extends React.Component {
  getClearButton(clearGridWorld, clearForbiddenStates, clearNorms) {
    const onClick = () => {
      this.props.clearGridWorld();
      this.props.clearForbiddenStates();
      this.props.clearNorms();
    };

    return <Button variant="danger" onClick={onClick}>Clear</Button>;
  }

  getEthicsSelector(updateEthics) {
    const onChange = (event) => updateEthics(event.target.value);

    return (
      <Form>
        <Form.Control as="select" value={this.props.settings.ethics} onChange={onChange}>
          <option value="forbiddenStateEthics">Forbidden State Ethics</option>
          <option value="normBasedEthics">Norm-Based Ethics</option>
        </Form.Control>
      </Form>
    );
  }

  getToleranceSelector(ethics, normBasedEthics, updateTolerance) {
    const onChange = (event) => updateTolerance(event.target.value);

    if (ethics === 'normBasedEthics') {
      return (
        <Form.Control as="select" value={normBasedEthics.tolerance} onChange={onChange}>
          <option value="0">No Tolerance</option>
          <option value="0.3">Low Tolerance</option>
          <option value="0.7">Medium Tolerance</option>
          <option value="1">High Tolerance</option>
        </Form.Control>
      );
    }
  }

  getViewSelector(view, updateView) {
    const onChange = (event) => updateView(event.target.value);

    return (
      <Form.Control as="select" value={view} onChange={onChange}>
        <option value="actions">Actions</option>
        <option value="values">Values</option>
      </Form.Control>
    );
  }

  getPriceOfMoralityProgressBar(amoralValues, moralValues) {
    const amoralValue = getTotalValue(amoralValues);
    const moralValue = getTotalValue(moralValues);
    const priceOfMorality = amoralValue - moralValue;

    const percentage = amoralValue === 0 ? 100 : (moralValue / amoralValue) * 100;
    const negatedPercentage = 100 - percentage;

    return (
      <ProgressBar>
        <ProgressBar striped variant="success" label={moralValue.toFixed(1)} now={percentage} key={1} />
        <ProgressBar striped variant="danger" label={priceOfMorality.toFixed(1)} now={negatedPercentage} key={2} />
      </ProgressBar>
    );
  }

  render() {
    const ethicsSelector = this.getEthicsSelector(this.props.updateEthics);
    const clearButton = this.getClearButton(this.props.clearGridWorld, this.props.clearForbiddenStates, this.props.clearNorms);
    const toleranceSelector = this.getToleranceSelector(this.props.settings.ethics, this.props.normBasedEthics, this.props.updateTolerance);
    const viewSelector = this.getViewSelector(this.props.settings.view, this.props.updateView);
    const priceOfMoralityProgressBar = this.getPriceOfMoralityProgressBar(this.props.amoralValues, this.props.moralValues);

    return (
      <Alert id="control-panel" variant={'light'}>
        <Row>
          <Col xs={1}>{clearButton}</Col>
          <Col xs={2}>{viewSelector}</Col>
          <Col xs={3}>{ethicsSelector}</Col>
          <Col xs={4}>{priceOfMoralityProgressBar}</Col>
          <Col xs={2}>{toleranceSelector}</Col>
        </Row>
      </Alert>
    );
  }
}

ControlPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  amoralValues: PropTypes.object.isRequired,
  moralValues: PropTypes.object.isRequired,
  updateEthics: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
