import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from '../components/Playground';
import { updateEthics, updateView, clear, updateGridWorld, toggleForbiddenState, toggleDuty, toggleMoralExample, updateTolerance } from '../actions';

class App extends React.Component {
  render() {
    return (
      <Playground
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        divineCommandTheory={this.props.divineCommandTheory}
        primaFacieDuties={this.props.primaFacieDuties}
        virtueEthics={this.props.virtueEthics}
        clear={this.props.clear}
        updateEthics={this.props.updateEthics}
        updateView={this.props.updateView}
        updateGridWorld={this.props.updateGridWorld}
        toggleForbiddenState={this.props.toggleForbiddenState}
        toggleDuty={this.props.toggleDuty}
        updateTolerance={this.props.updateTolerance}
        toggleMoralExample={this.props.toggleMoralExample}
      />
    );
  }
}

App.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  divineCommandTheory: PropTypes.arrayOf(PropTypes.number).isRequired,
  primaFacieDuties: PropTypes.object.isRequired,
  virtueEthics: PropTypes.object.isRequired,
  clear: PropTypes.func.isRequired,
  updateEthics: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  toggleDuty: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired,
  toggleMoralExample: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
    gridWorld: state.gridWorld,
    divineCommandTheory: state.divineCommandTheory,
    primaFacieDuties: state.primaFacieDuties,
    virtueEthics: state.virtueEthics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clear: () => dispatch(clear()),
    updateEthics: (ethics) => dispatch(updateEthics(ethics)),
    updateView: (view) => dispatch(updateView(view)),
    updateGridWorld: (row, column, value) => dispatch(updateGridWorld(row, column, value)),
    toggleForbiddenState: (id) => dispatch(toggleForbiddenState(id)),
    toggleDuty: (id, duty) => dispatch(toggleDuty(id, duty)),
    updateTolerance: (tolerance) => dispatch(updateTolerance(tolerance)),
    toggleMoralExample: (id, moralExample) => dispatch(toggleMoralExample(id, moralExample))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
