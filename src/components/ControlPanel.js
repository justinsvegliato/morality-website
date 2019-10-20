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
import { FaTrash, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmationWindowOpen: false,
      isHelpWindowOpen: false
    };
  }

  getClearButton() {
    const openConfirmationWindow = () => {
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
        <Button variant="danger" onClick={openConfirmationWindow}><FaTrash /></Button>

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
        <Form.Control id="ethics-selector" as="select" value={this.props.settings.ethics} onChange={onChange}>
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
        <Form>
          <Form.Control id="tolerance-selector" as="select" value={this.props.normBasedEthics.tolerance} onChange={onChange}>
            <option value="0">No Tolerance</option>
            <option value="0.3">Low Tolerance</option>
            <option value="0.7">Medium Tolerance</option>
            <option value="1">High Tolerance</option>
          </Form.Control>
        </Form>
      );
    }
  }

  getViewSelector() {
    const onChange = (event) => this.props.updateView(event.target.value);

    return (
      <Form>
        <Form.Control id="view-selector" as="select" value={this.props.view} onChange={onChange}>
          <option value="actions">Actions</option>
          <option value="values">Values</option>
        </Form.Control>
      </Form>
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
    const squareCounts = {};
    for (const row of this.props.gridWorld.grid) {
      for (const value of row) {
        if (!(value in squareCounts)) {
          squareCounts[value] = 0;
        }
        squareCounts[value]++;
      }
    }

    const squareCountRows = [['Empty', 'O'], ['Wall', 'W'], ['Goal', 'G']].map((pair) => {
      const content = pair[1] in squareCounts ? squareCounts[pair[1]] : 0;
      return (
        <Row noGutters>
          <Col xs={10} className="text-left">{pair[0]} Squares</Col>
          <Col xs={2} className="text-right">{content}</Col>
        </Row>
      );
    });

    return (
      <>
        <Row noGutters className="text-primary"><strong>Grid World Information</strong></Row>
        {squareCountRows}
      </>
    );
  }

  getForbiddenStateEthicsInformation() {
    if (this.props.settings.ethics !== 'forbiddenStateEthics') {
      return null;
    }

    return (
      <>
        <Row noGutters className="text-primary"><strong>Forbidden State Ethics</strong></Row>
        <Row noGutters>
          <Col xs={10} className="text-left">Forbidden Squares</Col>
          <Col xs={2} className="text-right">{this.props.forbiddenStateEthics.length}</Col>
        </Row>
      </>
    );
  }

  getNormBasedEthicsInformation() {
    if (this.props.settings.ethics !== 'normBasedEthics') {
      return null;
    }

    const normSquareCounts = {};
    for (const state in this.props.normBasedEthics.violationFunction) {
      for (const norm of this.props.normBasedEthics.violationFunction[state]) {
        if (!(norm in normSquareCounts)) {
          normSquareCounts[norm] = 0;
        }
        normSquareCounts[norm]++;
      }
    }

    const normSquareCountRows = this.props.normBasedEthics.norms.map((norm) => {
      const content = norm in normSquareCounts ? normSquareCounts[norm] : 0;
      return (
        <Row key={norm} noGutters>
          <Col xs={10} className="text-left">{norm} Squares</Col>
          <Col xs={2} className="text-right">{content}</Col>
        </Row>
      );
    });

    const normPenaltyRows = this.props.normBasedEthics.norms.map((norm) => {
      return (
        <Row key={norm} noGutters>
          <Col xs={10} className="text-left">{norm} Penalty</Col>
          <Col xs={2} className="text-right">{this.props.normBasedEthics.penaltyFunction[norm]}</Col>
        </Row>
      );
    });

    return (
      <>
        <Row noGutters className="text-primary"><strong>Norm-Based Ethics</strong></Row>
        {normSquareCountRows}
        {normPenaltyRows}
        <Row noGutters>
          <Col xs={10} className="text-left">Tolerance</Col>
          <Col xs={2} className="text-right">{this.props.normBasedEthics.tolerance}</Col>
        </Row>
      </>
    );
  }

  getMoralExemplarEthicsInformation() {
    if (this.props.settings.ethics !== 'moralExemplarEthics') {
      return null;
    }

    const moralExampleSquareCounts = {};
    for (const state in this.props.moralExemplarEthics) {
      for (const moralExample of this.props.moralExemplarEthics[state]) {
        if (!(moralExample in moralExampleSquareCounts)) {
          moralExampleSquareCounts[moralExample] = 0;
        }
        moralExampleSquareCounts[moralExample]++;
      }
    }

    const moralExampleSquareCountRows = ['North', 'East', 'South', 'West', 'Stay'].map((moralExample) => {
      const key = moralExample.toUpperCase();
      const content = key in moralExampleSquareCounts ? moralExampleSquareCounts[key] : 0;
      return (
        <Row key={moralExample} noGutters>
          <Col xs={10} className="text-left">{moralExample} Squares</Col>
          <Col xs={2} className="text-right">{content}</Col>
        </Row>
      );
    });

    return (
      <>
        <Row noGutters className="text-primary"><strong>Moral Exemplar Ethics</strong></Row>
        {moralExampleSquareCountRows}
      </>
    );
  }

  getInformationWindow() {
    const gridWorldInformation = this.getGridWorldInformation();
    const forbiddenStateEthicsInformation = this.getForbiddenStateEthicsInformation();
    const normBasedEthicsInformation = this.getNormBasedEthicsInformation();
    const moralExemplarEthicsInformation = this.getMoralExemplarEthicsInformation();

    const tooltip = (
      <Tooltip>
        {gridWorldInformation}
        {forbiddenStateEthicsInformation}
        {normBasedEthicsInformation}
        {moralExemplarEthicsInformation}
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" trigger="click" overlay={tooltip} rootClose>
        <Button id="info-button" variant="primary"><FaInfoCircle /></Button>
      </OverlayTrigger>
    );
  }

  getHelpButton() {
    const openHelpWindow = () => {
      this.setState({isHelpWindowOpen: true});
    };

    const onConfirm = () => {
      this.setState({isHelpWindowOpen: false});
    };

    return (
      <>
        <Button id="help-button" variant="primary" onClick={openHelpWindow}><FaQuestionCircle /></Button>

        <Modal id="help-window" size="lg" show={this.state.isHelpWindowOpen} scrollable>
          <Modal.Header>
            <Modal.Title>Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Control Panel</h5>
            <ul>
              <li>Click the <Badge pill variant="danger">red</Badge> button to clear the grid world.</li>
              <li>Select from the <Badge pill variant="primary">blue</Badge> dropdown to change whether to see the action or value of each square.</li>
              <li>Select from the <Badge pill variant="danger">red</Badge> dropdown to change the ethical context.</li>
              <li>The <Badge pill variant="success">green</Badge> part of the bar is the value of the moral policy.</li>
              <li>The <Badge pill variant="danger">red</Badge> part of the bar is the price of morality.</li>
              <li>Click on the <Badge pill variant="primary">blue</Badge> information icon to see extra information about the playground.</li>
              <li>Click on the <Badge pill variant="primary">blue</Badge> help icon to see how to use the playground.</li>
            </ul>

            <h5>Grid World</h5>
            <ul>
              <li>Click on a <Badge pill variant="secondary">square</Badge> to edit it.</li>
              <li>Each square shows the amoral policy in <Badge pill variant="info">light blue</Badge> and the moral policy in <Badge pill variant="success">green</Badge>.</li>
              <li>If the amoral policy and the moral policy are different, they're highlighted in <Badge pill variant="danger">red</Badge>.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onConfirm}>OK</Button>
          </Modal.Footer>
        </Modal>
      </>
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
          <Col xs={2}>{this.getPriceOfMoralityProgressBar()}</Col>
          <Col xs={1}>{this.getInformationWindow()}</Col>
          <Col xs={1}>{this.getHelpButton()}</Col>
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
  moralExemplarEthics: PropTypes.object.isRequired,
  amoralObjective: PropTypes.number.isRequired,
  moralObjective: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
  updateEthics: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
