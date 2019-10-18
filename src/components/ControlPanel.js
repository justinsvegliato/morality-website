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

  getClearButton() {
    const openConfirmationModal = () => {
      this.setState({isConfirmationWindowOpen: true});
    };

    const onCancel = () => {
      this.setState({isConfirmationWindowOpen: false});
    };

    const onConfirm = () => {
      this.props.clear();
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

  getEthicsSelector() {
    const onChange = (event) => this.props.updateEthics(event.target.value);

    return (
      <Form>
        <Form.Control as="select" value={this.props.settings.ethics} onChange={onChange}>
          <option value="forbiddenStateEthics">Forbidden State Ethics</option>
          <option value="normBasedEthics">Norm-Based Ethics</option>
          <option value="moralExemplarEthics">Moral Exemplar Ethics</option>
        </Form.Control>
      </Form>
    );
  }

  getToleranceSelector() {
    const onChange = (event) => this.props.updateTolerance(event.target.value);

    if (this.props.settings.ethics === 'normBasedEthics') {
      return (
        <Form.Control as="select" value={this.props.normBasedEthics.tolerance} onChange={onChange}>
          <option value="0">No Tolerance</option>
          <option value="0.3">Low Tolerance</option>
          <option value="0.7">Medium Tolerance</option>
          <option value="1">High Tolerance</option>
        </Form.Control>
      );
    }
  }

  getViewSelector() {
    const onChange = (event) => this.props.updateView(event.target.value);

    return (
      <Form.Control as="select" value={this.props.view} onChange={onChange}>
        <option value="actions">Actions</option>
        <option value="values">Values</option>
      </Form.Control>
    );
  }

  getPriceOfMoralityProgressBar() {
    const percentage = this.props.amoralObjective === 0 ? 100 : (this.props.moralObjective / this.props.amoralObjective) * 100;
    const negatedPercentage = 100 - percentage;

    const percentageText = percentage.toFixed(1);
    const negatedPercentageText = negatedPercentage.toFixed(1);

    const amoralObjectiveText = this.props.amoralObjective.toFixed(1);
    const moralObjectiveText = this.props.moralObjective.toFixed(1);

    const priceOfMorality = this.props.amoralObjective - this.props.moralObjective;
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

  getGridWorldInformation() {
    let emptySquareCount = 0;
    let wallSquareCount = 0;
    let goalSquareCount = 0;

    for (const row of this.props.gridWorld.grid) {
      for (const square of row) {
        if (square === 'O') {
          emptySquareCount++;
        } else if (square === 'W') {
          wallSquareCount++;
        } else {
          goalSquareCount++;
        }
      }
    }

    return (
      <>
        <Row noGutters className="text-primary"><strong>Grid World</strong></Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Empty Squares</Col>
          <Col xs={2} className="text-right">{emptySquareCount}</Col>
        </Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Wall Squares</Col>
          <Col xs={2} className="text-right">{wallSquareCount}</Col>
        </Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Goal Squares</Col>
          <Col xs={2} className="text-right">{goalSquareCount}</Col>
        </Row>
      </>
    );
  }

  getForbiddenStateEthicsInformation() {
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

  getNormBasedEthicsInformation() {
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
    const gridWorldInformation = this.getGridWorldInformation();
    const forbiddenStateEthicsInformation = this.getForbiddenStateEthicsInformation();
    const normBasedEthicsInformation = this.getNormBasedEthicsInformation();

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
    return (
      <Alert id="control-panel" variant="light">
        <Row>
          <Col xs={1}>{this.getClearButton()}</Col>
          <Col xs={2}>{this.getViewSelector()}</Col>
          <Col xs={3}>{this.getEthicsSelector()}</Col>
          <Col xs={2}>{this.getToleranceSelector()}</Col>
          <Col xs={3}>{this.getPriceOfMoralityProgressBar()}</Col>
          <Col xs={1}>{this.getInformationWindow()}</Col>
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
  updateView: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
