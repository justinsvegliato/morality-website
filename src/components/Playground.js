import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as morality from 'morality';
import * as GridWorldAgent from 'morality/src/agents/grid-world-agent.js';
import * as ForbiddenStateEthics from 'morality/src/ethics/forbidden-state-ethics.js';
import * as NormBasedEthics from 'morality/src/ethics/norm-based-ethics.js';
import * as MoralExemplarEthics from 'morality/src/ethics/moral-exemplar-ethics.js';
import ControlPanel from './ControlPanel';
import Square from './Square';

export default class Playground extends React.Component {
  getAgent(gridWorld) {
    return new GridWorldAgent(this.props.gridWorld);
  }

  getForbiddenStateEthics() {
    return new ForbiddenStateEthics(this.props.forbiddenStateEthics);
  }

  getNormBasedEthics() {
    const norms = this.props.normBasedEthics.norms;
    const violationFunction = (state) => {
      if (state in this.props.normBasedEthics.violationFunction) {
        return this.props.normBasedEthics.violationFunction[state];
      }
      return [];
    };
    const penaltyFunction = (norm, state, action) => {
      return this.props.normBasedEthics.penaltyFunction[norm];
    };
    const tolerance = this.props.normBasedEthics.tolerance;

    return new NormBasedEthics(norms, violationFunction, penaltyFunction, tolerance);
  }

  getMoralExemplarEthics() {
    const exemplarTrajectories = [
      [[], []]
    ];

    for (const state in this.props.moralExemplarEthics) {
      for (const action of this.props.moralExemplarEthics[state]) {
        exemplarTrajectories[0][0].push(state);
        exemplarTrajectories[0][1].push(action);
      }
    }

    return new MoralExemplarEthics(exemplarTrajectories);
  }

  getEthics() {
    if (this.props.settings.ethics === 'forbiddenStateEthics') {
      return this.getForbiddenStateEthics(this.props.forbiddenStateEthics);
    }

    if (this.props.settings.ethics === 'normBasedEthics') {
      return this.getNormBasedEthics(this.props.normBasedEthics);
    }

    if (this.props.settings.ethics === 'moralExemplarEthics') {
      return this.getMoralExemplarEthics(this.props.moralExemplarEthics);
    }
  }

  render() {
    const agent = this.getAgent();
    const ethics = this.getEthics();

    const amoralSolution = morality.solve(agent);
    const moralSolution = morality.solve(agent, ethics);

    const gridWorld = this.props.gridWorld.grid.map((squares, rowId) => {
      const row = squares.map((square, columnId) => {
        const id = this.props.gridWorld.width * rowId + columnId;
        return (
          <Col key={columnId} xs={1}>
            <Square
              settings={this.props.settings}
              id={id}
              rowId={rowId}
              columnId={columnId}
              value={square}
              forbiddenStateEthics={this.props.forbiddenStateEthics}
              normBasedEthics={this.props.normBasedEthics}
              moralExemplarEthics={this.props.moralExemplarEthics}
              amoralAction={amoralSolution.policy[id]}
              moralAction={moralSolution.policy[id]}
              amoralValue ={amoralSolution.values[id]}
              moralValue ={moralSolution.values[id]}
              updateGridWorld={this.props.updateGridWorld}
              toggleForbiddenState={this.props.toggleForbiddenState}
              toggleNorm={this.props.toggleNorm}
              toggleMoralExemplarAction={this.props.toggleMoralExemplarAction}
            />
          </Col>
        );
      });
      return <Row key={rowId}>{row}</Row>;
    });

    return (
      <>
        <ControlPanel
          settings={this.props.settings}
          gridWorld={this.props.gridWorld}
          forbiddenStateEthics={this.props.forbiddenStateEthics}
          normBasedEthics={this.props.normBasedEthics}
          amoralObjective ={amoralSolution.objective}
          moralObjective ={moralSolution.objective}
          updateEthics={this.props.updateEthics}
          updateView={this.props.updateView}
          clear={this.props.clear}
          updateTolerance={this.props.updateTolerance}
        />
        <Container id="grid-world">{gridWorld}</Container>
      </>
    );
  }
}

Playground.propTypes = {
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
