import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateGridWorld, toggleForbiddenState } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        gridWorld={this.props.gridWorld}
        forbiddenStates={this.props.forbiddenStates}
        updateGridWorld={this.props.updateGridWorld}
        toggleForbiddenState={this.props.toggleForbiddenState}
      />
    );
  }
}

App.propTypes = {
  gridWorld: PropTypes.object.isRequired,
  forbiddenStates: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    gridWorld: state.gridWorld,
    forbiddenStates: state.forbiddenStates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
