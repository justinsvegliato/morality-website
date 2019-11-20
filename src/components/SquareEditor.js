import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';

export default class SquareEditor extends React.Component {
  getGridWorldEditor(value, onGridWorldChange) {
    return (
      <Form.Group>
        <Form.Control as="select" value={this.props.value} onChange={this.props.onGridWorldChange}>
          <option value='O'>Empty Square</option>
          <option value='W'>Wall Square</option>
          <option value='G'>Goal Square</option>
        </Form.Control>
      </Form.Group>
    );
  }

  getForbiddenStateEthicsEditor() {
    const checked = this.props.forbiddenStateEthics.includes(this.props.id);

    return (
      <Form.Group>
        <Form.Label>Forbidden Static Ethics</Form.Label>
        <Form.Check type="checkbox" label="Forbidden" checked={checked} onChange={this.props.onForbiddenStateChange} />
      </Form.Group>
    );
  }

  getNormBasedEthicsEditor() {
    const checkboxes = this.props.normBasedEthics.norms.map((norm) => {
      const isActive = this.props.id in this.props.normBasedEthics.violationFunction;
      const checked = isActive && this.props.normBasedEthics.violationFunction[this.props.id].includes(norm);

      return <Form.Check key={norm} type="checkbox" label={norm} checked={checked} onChange={() => this.props.onNormChange(norm)} />;
    });

    // TODO Fix this inconsistency
    return (
      <Form.Group>
        <Form.Label>Prima Facie Duty Ethics</Form.Label>
        {checkboxes}
      </Form.Group>
    );
  }

  getMoralExemplarEthicsEditor() {
    const checkboxes = ['North', 'East', 'South', 'West', 'Stay'].map((action) => {
      const moralExample = action.toUpperCase();

      const isActive = this.props.id in this.props.moralExemplarEthics;
      const checked = isActive && this.props.moralExemplarEthics[this.props.id].includes(moralExample);

      return <Form.Check key={moralExample} type="checkbox" label={action} checked={checked} onChange={() => this.props.onMoralExampleChange(moralExample)} />;
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
    return (
      <Popover className={this.props.className} placement={this.props.placement} arrowProps={this.props.arrowProps} style={this.props.style}>
        <Popover.Title as="h3">Details</Popover.Title>
        <Popover.Content>
          <Form>
            {this.getGridWorldEditor()}
            {this.getEthicsEditor()}
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
  onMoralExampleChange: PropTypes.func.isRequired
};
