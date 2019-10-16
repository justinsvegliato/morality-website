import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

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

  getPriceOfMoralityProgressBar(amoralObjective, moralObjective) {
    const priceOfMorality = amoralObjective - moralObjective;

    const percentage = amoralObjective === 0 ? 100 : (moralObjective / amoralObjective) * 100;
    const negatedPercentage = 100 - percentage;

    const amoralObjectiveText = amoralObjective.toFixed(2);
    const moralObjectiveText = moralObjective.toFixed(2);
    const priceOfMoralityText = priceOfMorality.toFixed(2);

    const tooltip = (
      <Tooltip>
        <Badge variant="success">{moralObjectiveText}</Badge>
        <Badge variant="secondary">+</Badge>
        <Badge variant="danger">{priceOfMoralityText}</Badge>
        <Badge variant="secondary">=</Badge>
        <Badge variant="info">{amoralObjectiveText}</Badge>
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <ProgressBar>
          <ProgressBar striped variant="success" label={moralObjectiveText} now={percentage} key={1} />
          <ProgressBar striped variant="danger" label={priceOfMoralityText} now={negatedPercentage} key={2} />
        </ProgressBar>
      </OverlayTrigger>
    );
  }

  render() {
    const ethicsSelector = this.getEthicsSelector(this.props.updateEthics);
    const clearButton = this.getClearButton(this.props.clearGridWorld, this.props.clearForbiddenStates, this.props.clearNorms);
    const toleranceSelector = this.getToleranceSelector(this.props.settings.ethics, this.props.normBasedEthics, this.props.updateTolerance);
    const viewSelector = this.getViewSelector(this.props.settings.view, this.props.updateView);
    const priceOfMoralityProgressBar = this.getPriceOfMoralityProgressBar(this.props.amoralObjective, this.props.moralObjective);

    return (
      <Alert id="control-panel" variant={'light'}>
        <Row>
          <Col xs={1}>{clearButton}</Col>
          <Col xs={2}>{viewSelector}</Col>
          <Col xs={3}>{ethicsSelector}</Col>
          <Col xs={2}>{toleranceSelector}</Col>
          <Col xs={4}>{priceOfMoralityProgressBar}</Col>
        </Row>
      </Alert>
    );
  }
}

ControlPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  amoralObjective: PropTypes.number.isRequired,
  moralObjective: PropTypes.number.isRequired,
  updateEthics: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
