import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateEthics, updateView, clear, updateGridWorld, toggleForbiddenState, toggleNorm, toggleMoralExemplarAction, updateTolerance } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        moralExemplarEthics={this.props.moralExemplarEthics}
        updateEthics={this.props.updateEthics}
        updateView={this.props.updateView}
        clear={this.props.clear}
        updateGridWorld={this.props.updateGridWorld}
        toggleForbiddenState={this.props.toggleForbiddenState}
        toggleNorm={this.props.toggleNorm}
        toggleMoralExemplarAction={this.props.toggleMoralExemplarAction}
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
  moralExemplarEthics: PropTypes.object.isRequired,
  updateEthics: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  toggleMoralExemplarAction: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
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
    updateEthics: (ethics) => dispatch(updateEthics(ethics)),
    updateView: (view) => dispatch(updateView(view)),
    clear: () => dispatch(clear()),
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id)),
    toggleNorm: (id, norm) => dispatch(toggleNorm(id, norm)),
    toggleMoralExemplarAction: (id, norm) => dispatch(toggleMoralExemplarAction(id, norm)),
    updateTolerance: (tolerance) => dispatch(updateTolerance(tolerance))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
