import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';

export default class SquareEditor extends React.Component {
  getGridWorldEditor(value, onGridWorldChange) {
    return (
      <Form.Group>
        <Form.Control as="select" value={this.props.value} onChange={this.props.onGridWorldChange}>
          <option value='O'>Empty</option>
          <option value='W'>Wall</option>
          <option value='G'>Goal</option>
        </Form.Control>
      </Form.Group>
    );
  }

  getForbiddenStateEthicsEditor() { 
    return (
      <Form.Group>
        <Form.Label>Forbidden Static Ethics</Form.Label>
        <Form.Check
          type="checkbox"
          label="Forbidden"
          checked={this.props.forbiddenStateEthics.includes(this.props.id)}
          onChange={this.props.onForbiddenStateChange}
        />
      </Form.Group>
    );
  }

  getNormBasedEthicsEditor() {
    const checkboxes = this.props.normBasedEthics.norms.map((norm) => {
      return (
        <Form.Check
          type="checkbox"
          label={norm}
          checked={this.props.id in this.props.normBasedEthics.violationFunction && this.props.normBasedEthics.violationFunction[this.props.id].includes(norm)}
          onChange={() => this.props.onNormChange(norm)}
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

  getMoralExemplarEthicsEditor() {
    const actions = ['North', 'East', 'South', 'West', 'Stay'];

    const checkboxes = actions.map((action) => {
      const normalizedAction = action.toUpperCase();
      return (
        <Form.Check
          type="checkbox"
          label={action}
          checked={this.props.id in this.props.moralExemplarEthics && this.props.moralExemplarEthics[this.props.id].includes(normalizedAction)}
          onChange={() => this.props.onMoralExemplarActionChange(normalizedAction)}
        />
      );
    });

    return (
      <Form.Group>
        <Form.Label>Moral Exemplar Ethics</Form.Label>
        {checkboxes}
      </Form.Group>
    );
  }

  getEthicsEditor() {
    if (this.props.settings.ethics === 'forbiddenStateEthics') {
      return this.getForbiddenStateEthicsEditor();
    }

    if (this.props.settings.ethics === 'normBasedEthics') {
      return this.getNormBasedEthicsEditor();
    }

    if (this.props.settings.ethics === 'moralExemplarEthics') {
      return this.getMoralExemplarEthicsEditor();
    }
  }

  render() {
    const gridWorldEditor = this.getGridWorldEditor();
    const ethicsEditor = this.getEthicsEditor();

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
  moralExemplarEthics: PropTypes.object.isRequired,
  onGridWorldChange: PropTypes.func.isRequired,
  onForbiddenStateChange: PropTypes.func.isRequired,
  onNormChange: PropTypes.func.isRequired,
  onMoralExemplarActionChange: PropTypes.func.isRequired
};
