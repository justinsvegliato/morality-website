import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateEthics, updateView, clear, updateGridWorld, toggleForbiddenState, toggleNorm, toggleMoralExample, updateTolerance } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        moralExemplarEthics={this.props.moralExemplarEthics}
        clear={this.props.clear}
        updateEthics={this.props.updateEthics}
        updateView={this.props.updateView}
        updateGridWorld={this.props.updateGridWorld}
        toggleForbiddenState={this.props.toggleForbiddenState}
        toggleNorm={this.props.toggleNorm}
        updateTolerance={this.props.updateTolerance}
        toggleMoralExample={this.props.toggleMoralExample}
      />
    );
  }
}

App.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  moralExemplarEthics: PropTypes.object.isRequired,
  clear: PropTypes.func.isRequired,
  updateEthics: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired,
  toggleMoralExample: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
    gridWorld: state.gridWorld,
    forbiddenStateEthics: state.forbiddenStateEthics,
    normBasedEthics: state.normBasedEthics,
    moralExemplarEthics: state.moralExemplarEthics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clear: () => dispatch(clear()),
    updateEthics: (ethics) => dispatch(updateEthics(ethics)),
    updateView: (view) => dispatch(updateView(view)),
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id)),
    toggleNorm: (id, norm) => dispatch(toggleNorm(id, norm)),
    updateTolerance: (tolerance) => dispatch(updateTolerance(tolerance)),
    toggleMoralExample: (id, moralExample) => dispatch(toggleMoralExample(id, moralExample))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
