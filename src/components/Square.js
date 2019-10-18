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

  onNormChange(onChange, id, norm, overlay) {
    onChange(id, norm);
    overlay.hide();
  }

  onMoralExemplarActionChange(onChange, id, action, overlay) {
    onChange(id, action);
    overlay.hide();
  }

  getCardTitle() {
    if (this.props.value === 'W') {
      return null;
    }

    const amoralResult = this.props.settings.view === 'values' ? this.props.amoralValue.toFixed(1) : ICON_MAP[this.props.amoralAction];
    const moralResult = this.props.settings.view === 'values' ? this.props.moralValue.toFixed(1) : ICON_MAP[this.props.moralAction];

    const className = amoralResult !== moralResult ? 'highlight' : 0;

    return (
      <Card.Title>
        <Badge pill variant="info" className={className}>{amoralResult}</Badge>
        <Badge pill variant="success" className={className}>{moralResult}</Badge>
      </Card.Title>
    );
  }

  getCardBody() {
    if (this.props.value === 'W') {
      return null;
    }

    if (this.props.settings.ethics === 'forbiddenStateEthics' && this.props.forbiddenStateEthics.includes(this.props.id)) {
      return <Badge variant="danger">Forbidden</Badge>;
    }

    if (this.props.settings.ethics === 'normBasedEthics' && this.props.id in this.props.normBasedEthics.violationFunction) {
      return this.props.normBasedEthics.violationFunction[this.props.id].map((norm) => {
        return <Badge variant="danger">{norm}</Badge>;
      });
    }

    if (this.props.settings.ethics === 'moralExemplarEthics' && this.props.id in this.props.moralExemplarEthics && this.props.moralExemplarEthics[this.props.id].length > 0) {
      const northVariant = this.props.moralExemplarEthics[this.props.id].includes('NORTH') ? 'primary' : 'info';
      const eastVariant = this.props.moralExemplarEthics[this.props.id].includes('EAST') ? 'primary' : 'info';
      const southVariant = this.props.moralExemplarEthics[this.props.id].includes('SOUTH') ? 'primary' : 'info';
      const westVariant = this.props.moralExemplarEthics[this.props.id].includes('WEST') ? 'primary' : 'info';
      const stayVariant = this.props.moralExemplarEthics[this.props.id].includes('STAY') ? 'primary' : 'info';
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

  getSquare(cardColor, cardTitle, cardBody, squareEditor) {
    return (
      <OverlayTrigger ref="overlay" trigger="click" overlay={squareEditor} rootClose>
        <Card bg={cardColor} border={cardColor}>
          {cardTitle}
          {cardBody}
        </Card>
      </OverlayTrigger>
    );
  }

  render() {
    const onGridWorldChange = (event) => this.onGridWorldChange(this.props.updateGridWorld, this.props.rowId, this.props.columnId, event.target.value, this.refs.overlay);
    const onForbiddenStateChange = () => this.onForbiddenStateChange(this.props.toggleForbiddenState, this.props.id, this.refs.overlay);
    const onNormChange = (norm) => this.onNormChange(this.props.toggleNorm, this.props.id, norm, this.refs.overlay);
    const onMoralExemplarActionChange = (action) => this.onMoralExemplarActionChange(this.props.toggleMoralExemplarAction, this.props.id, action, this.refs.overlay);

    const squareEditor = (
      <SquareEditor
        settings={this.props.settings}
        id={this.props.id}
        value={this.props.value}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        moralExemplarEthics={this.props.moralExemplarEthics}
        onGridWorldChange={onGridWorldChange}
        onForbiddenStateChange={onForbiddenStateChange}
        onNormChange={onNormChange}
        onMoralExemplarActionChange={onMoralExemplarActionChange}
      />
    );

    const cardColor = COLOR_MAP[this.props.value];
    const cardTitle = this.getCardTitle();
    const cardBody = this.getCardBody();

    return this.getSquare(cardColor, cardTitle, cardBody, squareEditor);
  }
}

Square.propTypes = {
  settings: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  rowId: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  moralExemplarEthics: PropTypes.object.isRequired,
  amoralAction: PropTypes.string.isRequired,
  moralAction: PropTypes.string.isRequired,
  amoralValue: PropTypes.number.isRequired,
  moralValue: PropTypes.number.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  toggleMoralExemplarAction: PropTypes.func.isRequired
};
