import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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

  getCardTitle(id, value, amoralAction, moralAction, ethics, forbiddenStateEthics) {
    if (value === 'W') {
      return null;
    }

    const amoralActionIcon = ICON_MAP[amoralAction];
    const moralActionIcon = ICON_MAP[moralAction];

    if (ethics === 'forbiddenStateEthics' && forbiddenStateEthics.includes(id)) {
      return (
        <Card.Title>
          <Badge pill variant="info">{amoralActionIcon}</Badge>
        </Card.Title>
      );
    }

    if (amoralAction === moralAction) {
      return (
        <Card.Title>
          <Badge pill variant="info">{amoralActionIcon}</Badge>
        </Card.Title>
      );
    }

    return (
      <Card.Title>
        <Badge pill variant="info">{amoralActionIcon}</Badge>
        <Badge pill variant="success">{moralActionIcon}</Badge>
      </Card.Title>
    );
  }

  getCardBody(id, ethics, forbiddenStateEthics, normBasedEthics) {
    if (this.props.settings.ethics === 'forbiddenStateEthics' && forbiddenStateEthics.includes(id)) {
      return <Badge variant="danger">Forbidden</Badge>;
    }

    if (this.props.settings.ethics === 'normBasedEthics' && id in normBasedEthics.violationFunction) {
      return normBasedEthics.violationFunction[id].map((norm) => {
        return <Badge variant="danger">{norm}</Badge>;
      });
    }
  }

  getSquare(cardColor, cardTitle, cardBody, squareEditor) {
    return (
      <OverlayTrigger ref="overlay" trigger="click" overlay={squareEditor}>
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

    const squareEditor = (
      <SquareEditor
        settings={this.props.settings}
        id={this.props.id}
        value={this.props.value}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        onGridWorldChange={onGridWorldChange}
        onForbiddenStateChange={onForbiddenStateChange}
        onNormChange={onNormChange}
      />
    );

    const cardColor = COLOR_MAP[this.props.value];
    const cardTitle = this.getCardTitle(this.props.id, this.props.value, this.props.amoralAction, this.props.moralAction, this.props.settings.ethics, this.props.forbiddenStateEthics);
    const cardBody = this.getCardBody(this.props.id, this.props.settings.ethics, this.props.forbiddenStateEthics, this.props.normBasedEthics);

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
  amoralAction: PropTypes.string.isRequired,
  moralAction: PropTypes.string.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired
};
