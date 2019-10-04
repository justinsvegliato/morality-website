import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaArrowUp, FaArrowRight, FaArrowDown, FaArrowLeft, FaStopCircle } from 'react-icons/fa';
import SquareEditor from './SquareEditor';

export default class Square extends React.Component {
  onGridWorldChange(rowId, columnId, value, onChange, overlay) {
    onChange(rowId, columnId, value);
    overlay.hide();
  }

  onForbiddenStateChange(id, onChange, overlay) {
    onChange(id);
    overlay.hide();
  }

  getColor(type, isForbidden) {
    if (isForbidden) {
      return 'danger';
    }
    if (type === 'W') {
      return 'dark';
    }
    if (type === 'G') {
      return 'success';
    }
    return 'secondary';
  }

  getIcon(action) {
    if (action === 'NORTH') {
      return <FaArrowUp />;
    }
    if (action === 'EAST') {
      return <FaArrowRight />;
    }
    if (action === 'SOUTH') {
      return <FaArrowDown />;
    }
    if (action === 'WEST') {
      return <FaArrowLeft />;
    }
    return <FaStopCircle />;
  }

  getCardTitle(type, isForbidden, amoralAction, moralAction) {
    if (type === 'W') {
      return null;
    }

    const amoralActionIcon = this.getIcon(amoralAction);
    const moralActionIcon = this.getIcon(moralAction);

    if (amoralAction === moralAction || isForbidden) {
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

  getSquare(squareEditor, color, cardTitle) {
    return (
      <OverlayTrigger ref="overlay" trigger="click" overlay={squareEditor}>
        <Card bg={color} border={color}>{cardTitle}</Card>
      </OverlayTrigger>
    );
  }

  render() {
    const onGridWorldChange = (event) => this.onGridWorldChange(this.props.rowId, this.props.columnId, event.target.value, this.props.updateGridWorld, this.refs.overlay);
    const onForbiddenStateChange = () => this.onForbiddenStateChange(this.props.id, this.props.toggleForbiddenState, this.refs.overlay);

    const squareEditor = (
      <SquareEditor
        type={this.props.type}
        isForbidden={this.props.isForbidden}
        onGridWorldChange={onGridWorldChange}
        onForbiddenStateChange={onForbiddenStateChange}
      />
    );
    const color = this.getColor(this.props.type, this.props.isForbidden);
    const cardTitle = this.getCardTitle(this.props.type, this.props.isForbidden, this.props.amoralAction, this.props.moralAction);

    return this.getSquare(squareEditor, color, cardTitle);
  }
}

Square.propTypes = {
  id: PropTypes.number.isRequired,
  rowId: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  amoralAction: PropTypes.string.isRequired,
  moralAction: PropTypes.string.isRequired,
  isForbidden: PropTypes.bool.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired
};
