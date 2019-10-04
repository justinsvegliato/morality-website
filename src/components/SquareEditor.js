import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';

export default class SquareEditor extends React.Component {
  render() {
    return (
      <Popover placement={this.props.placement} arrowProps={this.props.arrowProps} style={this.props.style}>
        <Popover.Title as="h3">Details</Popover.Title>
        <Popover.Content>
          <Form>
            <Form.Group>
              <Form.Control as="select" value={this.props.type} onChange={this.props.onGridWorldChange}>
                <option value='O'>Empty</option>
                <option value='W'>Wall</option>
                <option value='G'>Goal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Forbidden State"
                checked={this.props.isForbidden}
                onChange={this.props.onForbiddenStateChange}
              />
            </Form.Group>
          </Form>
        </Popover.Content>
      </Popover>
    );
  }
}

SquareEditor.propTypes = {
  placement: PropTypes.string,
  arrowProps: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  isForbidden: PropTypes.bool.isRequired,
  onGridWorldChange: PropTypes.func.isRequired,
  onForbiddenStateChange: PropTypes.func.isRequired
};
