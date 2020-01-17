import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import { FaArrowUp, FaArrowRight, FaArrowDown, FaArrowLeft, FaStopCircle } from 'react-icons/fa';
import SquareEditor from './SquareEditor';

const COLOR_MAP = {
  'W': 'dark',
  'G': 'success',
  'O': 'secondary'
};

const ICON_MAP = {
  'NORTH': <FaArrowUp />,
  'EAST': <FaArrowRight />,
  'SOUTH': <FaArrowDown />,
  'WEST': <FaArrowLeft />,
  'STAY': <FaStopCircle />
};

export default class Square extends React.Component {
  onGridWorldChange(onChange, rowId, columnId, value, overlay) {
    onChange(rowId, columnId, value);
    overlay.hide();
  }

  onForbiddenStateChange(onChange, id, overlay) {
    onChange(id);
    overlay.hide();
  }

  onDutyChange(onChange, id, duty, overlay) {
    onChange(id, duty);
    overlay.hide();
  }

  onMoralExampleChange(onChange, id, moralExample, overlay) {
    onChange(id, moralExample);
    overlay.hide();
  }

  getCardTitle() {
    if (this.props.value === 'W') {
      return null;
    }

    const amoralResult = this.props.settings.view === 'values'
      ? this.props.amoralValue.toFixed(1)
      : ICON_MAP[this.props.amoralAction];

    const moralResult = this.props.settings.view === 'values'
      ? this.props.moralValue.toFixed(1)
      : ICON_MAP[this.props.moralAction];

    const className = amoralResult !== moralResult ? 'highlight' : 0;

    return (
      <Card.Title>
        <Badge pill variant="info" className={className}>{amoralResult}</Badge>
        <Badge pill variant="success" className={className}>{moralResult}</Badge>
      </Card.Title>
    );
  }

  getCardBody() {
    if (this.props.settings.ethics === 'divineCommandTheory' && this.props.divineCommandTheory.includes(this.props.id)) {
      return <Badge variant="danger">Forbidden</Badge>;
    }

    if (this.props.settings.ethics === 'primaFacieDuties' && this.props.id in this.props.primaFacieDuties.violationFunction) {
      return this.props.primaFacieDuties.violationFunction[this.props.id].map((duty) => {
        return <Badge key={duty} variant="danger">{duty}</Badge>;
      });
    }

    if (this.props.settings.ethics === 'virtueEthics' && this.props.id in this.props.virtueEthics && this.props.virtueEthics[this.props.id].length > 0) {
      const northVariant = this.props.virtueEthics[this.props.id].includes('NORTH') ? 'primary' : 'info';
      const eastVariant = this.props.virtueEthics[this.props.id].includes('EAST') ? 'primary' : 'info';
      const southVariant = this.props.virtueEthics[this.props.id].includes('SOUTH') ? 'primary' : 'info';
      const westVariant = this.props.virtueEthics[this.props.id].includes('WEST') ? 'primary' : 'info';
      const stayVariant = this.props.virtueEthics[this.props.id].includes('STAY') ? 'primary' : 'info';

      return (
        <Card.Body>
          <Row noGutters>
            <Col xs={{span: 3, offset: 4}}><Badge pill variant={northVariant}><FaArrowUp /></Badge></Col>
          </Row>
          <Row noGutters>
            <Col xs={{span: 3}}><Badge pill variant={westVariant}><FaArrowLeft /></Badge></Col>
            <Col xs={{span: 3, offset: 1}}><Badge pill variant={stayVariant}><FaStopCircle /></Badge></Col>
            <Col xs={{span: 3, offset: 1}}><Badge pill variant={eastVariant}><FaArrowRight /></Badge></Col>
          </Row>
          <Row noGutters>
            <Col xs={{span: 3, offset: 4}}><Badge pill variant={southVariant}><FaArrowDown /></Badge></Col>
          </Row>
        </Card.Body>
      );
    }
  }

  getSquareEditor() {
    const onGridWorldChange = (event) => this.onGridWorldChange(this.props.updateGridWorld, this.props.rowId, this.props.columnId, event.target.value, this.refs.overlay);
    const onForbiddenStateChange = () => this.onForbiddenStateChange(this.props.toggleForbiddenState, this.props.id, this.refs.overlay);
    const onDutyChange = (duty) => this.onDutyChange(this.props.toggleDuty, this.props.id, duty, this.refs.overlay);
    const onMoralExampleChange = (moralExample) => this.onMoralExampleChange(this.props.toggleMoralExample, this.props.id, moralExample, this.refs.overlay);

    return (
      <SquareEditor
        settings={this.props.settings}
        id={this.props.id}
        value={this.props.value}
        divineCommandTheory={this.props.divineCommandTheory}
        primaFacieDuties={this.props.primaFacieDuties}
        virtueEthics={this.props.virtueEthics}
        onGridWorldChange={onGridWorldChange}
        onForbiddenStateChange={onForbiddenStateChange}
        onDutyChange={onDutyChange}
        onMoralExampleChange={onMoralExampleChange}
      />
    );
  }

  render() {
    return (
      <OverlayTrigger ref="overlay" trigger="click" overlay={this.getSquareEditor()} rootClose>
        <Card bg={COLOR_MAP[this.props.value]} border={COLOR_MAP[this.props.value]}>
          {this.getCardTitle()}
          {this.getCardBody()}
        </Card>
      </OverlayTrigger>
    );
  }
}

Square.propTypes = {
  settings: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  rowId: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  divineCommandTheory: PropTypes.arrayOf(PropTypes.number).isRequired,
  primaFacieDuties: PropTypes.object.isRequired,
  virtueEthics: PropTypes.object.isRequired,
  amoralAction: PropTypes.string.isRequired,
  moralAction: PropTypes.string.isRequired,
  amoralValue: PropTypes.number.isRequired,
  moralValue: PropTypes.number.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleDuty: PropTypes.func.isRequired,
  toggleMoralExample: PropTypes.func.isRequired
};
