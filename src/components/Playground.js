import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import morality from 'morality';
import agents from 'morality/agents';
import ethics from 'morality/ethics';
import ControlPanel from './ControlPanel';
import Square from './Square';

export default class Playground extends React.Component {
  getAgent() {
    return new agents.GridWorldAgent(this.props.gridWorld);
  }

  getDivineCommandTheory() {
    return new ethics.DivineCommandTheory(this.props.divineCommandTheory);
  }

  getPrimaFacieDuties() {
    const duties = this.props.primaFacieDuties.duties;
    const violationFunction = (state) => {
      if (state in this.props.primaFacieDuties.violationFunction) {
        return this.props.primaFacieDuties.violationFunction[state];
      }
      return [];
    };
    const penaltyFunction = (duty, state) => {
      return this.props.primaFacieDuties.penaltyFunction[duty];
    };
    const tolerance = this.props.primaFacieDuties.tolerance;

    return new ethics.PrimaFacieDuties(duties, violationFunction, penaltyFunction, tolerance);
  }

  getVirtueEthics() {
    const moralTrajectories = [
      [[], []]
    ];

    for (const state in this.props.virtueEthics) {
      for (const action of this.props.virtueEthics[state]) {
        moralTrajectories[0][0].push(state);
        moralTrajectories[0][1].push(action);
      }
    }

    return new ethics.VirtueEthics(moralTrajectories);
  }

  getEthics() {
    if (this.props.settings.ethics === 'divineCommandTheory') {
      return this.getDivineCommandTheory(this.props.divineCommandTheory);
    }

    if (this.props.settings.ethics === 'primaFacieDuties') {
      return this.getPrimaFacieDuties(this.props.primaFacieDuties);
    }

    if (this.props.settings.ethics === 'virtueEthics') {
      return this.getVirtueEthics(this.props.virtueEthics);
    }
  }

  getControlPanel(amoralSolution, moralSolution) {
    return (
      <ControlPanel
        settings={this.props.settings}
        gridWorld={this.props.gridWorld}
        divineCommandTheory={this.props.divineCommandTheory}
        primaFacieDuties={this.props.primaFacieDuties}
        virtueEthics={this.props.virtueEthics}
        amoralObjective ={amoralSolution.objective}
        moralObjective ={moralSolution.objective}
        clear={this.props.clear}
        updateEthics={this.props.updateEthics}
        updateView={this.props.updateView}
        updateTolerance={this.props.updateTolerance}
      />
    );
  }

  getGridWorld(amoralSolution, moralSolution) {
    const content = this.props.gridWorld.map((squares, rowId) => {
      const row = squares.map((square, columnId) => {
        const id = squares.length * rowId + columnId;
        return (
          <Col key={columnId} xs={1}>
            <Square
              settings={this.props.settings}
              id={id}
              rowId={rowId}
              columnId={columnId}
              value={square}
              divineCommandTheory={this.props.divineCommandTheory}
              primaFacieDuties={this.props.primaFacieDuties}
              virtueEthics={this.props.virtueEthics}
              amoralAction={amoralSolution.policy[id]}
              moralAction={moralSolution.policy[id]}
              amoralValue ={amoralSolution.values[id]}
              moralValue ={moralSolution.values[id]}
              updateGridWorld={this.props.updateGridWorld}
              toggleForbiddenState={this.props.toggleForbiddenState}
              toggleDuty={this.props.toggleDuty}
              toggleMoralExample={this.props.toggleMoralExample}
            />
          </Col>
        );
      });
      return <Row key={rowId}>{row}</Row>;
    });

    return <Container id="grid-world">{content}</Container>;
  }

  render() {
    const agent = this.getAgent();
    const ethics = this.getEthics();

    const amoralSolution = morality.solve(agent);
    const moralSolution = morality.solve(agent, ethics);

    return (
      <>
        {this.getControlPanel(amoralSolution, moralSolution)}
        {this.getGridWorld(amoralSolution, moralSolution)}
      </>
    );
  }
}

Playground.propTypes = {
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
