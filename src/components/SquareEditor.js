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

  getDivineCommandTheoryEditor() {
    const checked = this.props.divineCommandTheory.includes(this.props.id);

    return (
      <Form.Group>
        <Form.Label>Divine Command Theory</Form.Label>
        <Form.Check type="checkbox" label="Forbidden" checked={checked} onChange={this.props.onForbiddenStateChange} />
      </Form.Group>
    );
  }

  getPrimaFacieDutiesEditor() {
    const checkboxes = this.props.primaFacieDuties.duties.map((duty) => {
      const isActive = this.props.id in this.props.primaFacieDuties.violationFunction;
      const checked = isActive && this.props.primaFacieDuties.violationFunction[this.props.id].includes(duty);

      return <Form.Check key={duty} type="checkbox" label={duty} checked={checked} onChange={() => this.props.onDutyChange(duty)} />;
    });

    return (
      <Form.Group>
        <Form.Label>Prima Facie Duties</Form.Label>
        {checkboxes}
      </Form.Group>
    );
  }

  getVirtueEthicsEditor() {
    const checkboxes = ['North', 'East', 'South', 'West', 'Stay'].map((action) => {
      const moralExample = action.toUpperCase();

      const isActive = this.props.id in this.props.virtueEthics;
      const checked = isActive && this.props.virtueEthics[this.props.id].includes(moralExample);

      return <Form.Check key={moralExample} type="checkbox" label={action} checked={checked} onChange={() => this.props.onMoralExampleChange(moralExample)} />;
    });

    return (
      <Form.Group>
        <Form.Label>Virtue Ethics</Form.Label>
        {checkboxes}
      </Form.Group>
    );
  }

  getEthicsEditor() {
    if (this.props.settings.ethics === 'divineCommandTheory') {
      return this.getDivineCommandTheoryEditor();
    }

    if (this.props.settings.ethics === 'primaFacieDuties') {
      return this.getPrimaFacieDutiesEditor();
    }

    if (this.props.settings.ethics === 'virtueEthics') {
      return this.getVirtueEthicsEditor();
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
  divineCommandTheory: PropTypes.arrayOf(PropTypes.number).isRequired,
  primaFacieDuties: PropTypes.object.isRequired,
  virtueEthics: PropTypes.object.isRequired,
  onGridWorldChange: PropTypes.func.isRequired,
  onForbiddenStateChange: PropTypes.func.isRequired,
  onDutyChange: PropTypes.func.isRequired,
  onMoralExampleChange: PropTypes.func.isRequired
};
