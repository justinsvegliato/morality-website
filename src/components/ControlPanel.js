import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaInfo } from 'react-icons/fa';

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmationWindowOpen: false
    };
  }

  getClearButton(clearGridWorld, clearForbiddenStates, clearNorms) {
    const openConfirmationModal = () => {
      this.setState({isConfirmationWindowOpen: true});
    };

    const onCancel = () => {
      this.setState({isConfirmationWindowOpen: false});
    };

    const onConfirm = () => {
      this.props.clearGridWorld();
      this.props.clearForbiddenStates();
      this.props.clearNorms();
      this.setState({isConfirmationWindowOpen: false});
    };

    return (
      <>
        <Button variant="danger" onClick={openConfirmationModal}>Clear</Button>

        <Modal show={this.state.isConfirmationWindowOpen}>
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to clear the grid world?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onConfirm}>OK</Button>
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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

    const percentageText = percentage.toFixed(1);
    const negatedPercentageText = negatedPercentage.toFixed(1);
    const amoralObjectiveText = amoralObjective.toFixed(1);
    const moralObjectiveText = moralObjective.toFixed(1);
    const priceOfMoralityText = priceOfMorality.toFixed(1);

    const tooltip = (
      <Tooltip>
        <Row noGutters className="text-success">
          <Col xs={7} className="text-left">Moral Policy Value</Col>
          <Col xs={2} className="text-right">{moralObjectiveText}</Col>
          <Col xs={3} className="text-right">{percentageText}%</Col>
        </Row>
        <Row noGutters className="text-danger">
          <Col xs={7} className="text-left">Price of Morality</Col>
          <Col xs={2} className="text-right">{priceOfMoralityText}</Col>
          <Col xs={3} className="text-right">{negatedPercentageText}%</Col>
        </Row>
        <Row noGutters className="text-info">
          <Col xs={7} className="text-left">Amoral Policy Value</Col>
          <Col xs={2} className="text-right">{amoralObjectiveText}</Col>
          <Col xs={3} className="text-right">100%</Col>
        </Row>

        <Badge variant="success">{moralObjectiveText}</Badge>
        <Badge variant="secondary">+</Badge>
        <Badge variant="danger">{priceOfMoralityText}</Badge>
        <Badge variant="secondary">=</Badge>
        <Badge variant="info">{amoralObjectiveText}</Badge>
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <ProgressBar>
          <ProgressBar striped variant="success" label={moralObjectiveText} now={percentage} key={1} />
          <ProgressBar striped variant="danger" label={priceOfMoralityText} now={negatedPercentage} key={2} />
        </ProgressBar>
      </OverlayTrigger>
    );
  }

  getGridWorldInformation(gridWorld) {
    let emptyCount = 0;
    let wallCount = 0;
    let goalCount = 0;

    for (const row of gridWorld.grid) {
      for (const square of row) {
        if (square === 'O') {
          emptyCount++;
        } else if (square === 'W') {
          wallCount++;
        } else {
          goalCount++;
        }
      }
    }

    return (
      <>
        <Row noGutters className="text-primary"><strong>Grid World</strong></Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Empty Squares</Col>
          <Col xs={2} className="text-right">{emptyCount}</Col>
        </Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Wall Squares</Col>
          <Col xs={2} className="text-right">{wallCount}</Col>
        </Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Goal Squares</Col>
          <Col xs={2} className="text-right">{goalCount}</Col>
        </Row>
      </>
    );
  }

  getForbiddenStateEthicsInformation(forbiddenStateEthics) {
    return (
      <>
        <Row noGutters className="text-primary"><strong>Forbidden State Ethics</strong></Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Forbidden States</Col>
          <Col xs={2} className="text-right">{this.props.forbiddenStateEthics.length}</Col>
        </Row>
      </>
    );
  }

  getNormBasedEthicsInformation(normBasedEthics) {
    const normPenaltyRows = this.props.normBasedEthics.norms.map((norm) => {
      return (
        <Row noGutters>
          <Col xs={10} className="text-left">{norm} Penalty</Col>
          <Col xs={2} className="text-right">{this.props.normBasedEthics.penaltyFunction[norm]}</Col>
        </Row>
      );
    });

    return (
      <>
        <Row noGutters className="text-primary"><strong>Norm-Based Ethics</strong></Row>
        {normPenaltyRows}
        <Row noGutters>
          <Col xs={10} className="text-left">Tolerance</Col>
          <Col xs={2} className="text-right">{this.props.normBasedEthics.tolerance}</Col>
        </Row>
      </>
    );
  }

  getInformationWindow(settings, gridWorld, forbiddenStateEthics, normBasedEthics) {
    const gridWorldInformation = this.getGridWorldInformation(gridWorld);
    const forbiddenStateEthicsInformation = this.getForbiddenStateEthicsInformation(forbiddenStateEthics);
    const normBasedEthicsInformation = this.getNormBasedEthicsInformation(normBasedEthics);

    const tooltip = (
      <Tooltip>
        {gridWorldInformation}
        {forbiddenStateEthicsInformation}
        {normBasedEthicsInformation}
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <Badge variant="primary"><FaInfo /></Badge>
      </OverlayTrigger>
    );
  }

  render() {
    const ethicsSelector = this.getEthicsSelector(this.props.updateEthics);
    const clearButton = this.getClearButton(this.props.clearGridWorld, this.props.clearForbiddenStates, this.props.clearNorms);
    const toleranceSelector = this.getToleranceSelector(this.props.settings.ethics, this.props.normBasedEthics, this.props.updateTolerance);
    const viewSelector = this.getViewSelector(this.props.settings.view, this.props.updateView);
    const priceOfMoralityProgressBar = this.getPriceOfMoralityProgressBar(this.props.amoralObjective, this.props.moralObjective);
    const informationWindow = this.getInformationWindow(this.props.settings, this.props.gridWorld, this.props.forbiddenStateEthics, this.props.normBasedEthics);

    return (
      <Alert id="control-panel" variant={'light'}>
        <Row>
          <Col xs={1}>{clearButton}</Col>
          <Col xs={2}>{viewSelector}</Col>
          <Col xs={3}>{ethicsSelector}</Col>
          <Col xs={2}>{toleranceSelector}</Col>
          <Col xs={3}>{priceOfMoralityProgressBar}</Col>
          <Col xs={1}>{informationWindow}</Col>
        </Row>
      </Alert>
    );
  }
}

ControlPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.object.isRequired,
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
