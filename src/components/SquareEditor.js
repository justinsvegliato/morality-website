import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';

export default class SquareEditor extends React.Component {
  getGridWorldEditor(value, onGridWorldChange) {
    return (
      <Form.Group>
        <Form.Control as="select" value={value} onChange={onGridWorldChange}>
          <option value='O'>Empty</option>
          <option value='W'>Wall</option>
          <option value='G'>Goal</option>
        </Form.Control>
      </Form.Group>
    );
  }

  getForbiddenStateEthicsEditor(id, forbiddenStateEthics, onForbiddenStateChange) {
    return (
      <Form.Group>
        <Form.Label>Forbidden Static Ethics</Form.Label>
        <Form.Check
          type="checkbox"
          label="Forbidden"
          checked={forbiddenStateEthics.includes(id)}
          onChange={onForbiddenStateChange}
        />
      </Form.Group>
    );
  }

  getNormBasedEthicsEditor(id, normBasedEthics, onNormChange) {
    const checkboxes = normBasedEthics.norms.map((norm) => {
      return (
        <Form.Check
          type="checkbox"
          label={norm}
          checked={id in normBasedEthics.violationFunction && normBasedEthics.violationFunction[id].includes(norm)}
          onChange={() => onNormChange(norm)}
        />
      );
    });

    return (
      <Form.Group>
        <Form.Label>Norm-Based Ethics</Form.Label>
        {checkboxes}
      </Form.Group>
    );
  }

  getEthicsEditor(id, ethics, forbiddenStateEthics, onForbiddenStateChange, normBasedEthics, onNormChange) {
    if (ethics === 'forbiddenStateEthics') {
      return this.getForbiddenStateEthicsEditor(id, forbiddenStateEthics, onForbiddenStateChange);
    }

    if (ethics === 'normBasedEthics') {
      return this.getNormBasedEthicsEditor(id, normBasedEthics, onNormChange);
    }
  }

  render() {
    const gridWorldEditor = this.getGridWorldEditor(this.props.value, this.props.onGridWorldChange);
    const ethicsEditor = this.getEthicsEditor(this.props.id, this.props.settings.ethics, this.props.forbiddenStateEthics, this.props.onForbiddenStateChange, this.props.normBasedEthics, this.props.onNormChange);
    return (
      <Popover className={this.props.className} placement={this.props.placement} arrowProps={this.props.arrowProps} style={this.props.style}>
        <Popover.Title as="h3">Details</Popover.Title>
        <Popover.Content>
          <Form>
            {gridWorldEditor}
            {ethicsEditor}
          </Form>
        </Popover.Content>
      </Popover>
    );
  }
}

SquareEditor.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.string,
  arrowProps: PropTypes.object,
  style: PropTypes.object,
  settings: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  onGridWorldChange: PropTypes.func.isRequired,
  onForbiddenStateChange: PropTypes.func.isRequired,
  onNormChange: PropTypes.func.isRequired
};
