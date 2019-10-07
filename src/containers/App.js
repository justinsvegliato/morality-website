import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateEthics, updateGridWorld, toggleForbiddenState, toggleNorm } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        forbiddenStateEthics={this.props.forbiddenStateEthics}
        normBasedEthics={this.props.normBasedEthics}
        updateGridWorld={this.props.updateGridWorld}
        toggleForbiddenState={this.props.toggleForbiddenState}
        toggleNorm={this.props.toggleNorm}
        updateEthics={this.props.updateEthics}
      />
    );
  }
}

App.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  updateEthics: PropTypes.func.isRequired
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
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id)),
    toggleNorm: (id, norm) => dispatch(toggleNorm(id, norm))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
