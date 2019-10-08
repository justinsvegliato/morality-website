import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateEthics, clearGridWorld, updateGridWorld, clearForbiddenStates, toggleForbiddenState, clearNorms, toggleNorm, updateTolerance } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        updateEthics={this.props.updateEthics}
        clearGridWorld={this.props.clearGridWorld}
        updateGridWorld={this.props.updateGridWorld}
        clearForbiddenStates={this.props.clearForbiddenStates}
        toggleForbiddenState={this.props.toggleForbiddenState}
        clearNorms={this.props.clearNorms}
        toggleNorm={this.props.toggleNorm}
        updateTolerance={this.props.updateTolerance}
      />
    );
  }
}

App.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  updateEthics: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
    gridWorld: state.gridWorld,
    forbiddenStateEthics: state.forbiddenStateEthics,
    normBasedEthics: state.normBasedEthics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEthics: (ethics) => dispatch(updateEthics(ethics)),
    clearGridWorld: () => dispatch(clearGridWorld()),
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    clearForbiddenStates: () => dispatch(clearForbiddenStates()),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id)),
    clearNorms: () => dispatch(clearNorms()),
    toggleNorm: (id, norm) => dispatch(toggleNorm(id, norm)),
    updateTolerance: (tolerance) => dispatch(updateTolerance(tolerance))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
