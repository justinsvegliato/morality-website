import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as morality from 'morality';
import * as GridWorldAgent from 'morality/src/agents/grid-world-agent.js';
import * as ForbiddenStateEthics from 'morality/src/ethics/forbidden-state-ethics.js';
import * as NormBasedEthics from 'morality/src/ethics/norm-based-ethics.js';
import ControlPanel from './ControlPanel';
import Square from './Square';

export default class Playground extends React.Component {
  getAgent(gridWorld) {
    return new GridWorldAgent(gridWorld);
  }

  getForbiddenStateEthics(forbiddenStateEthics) {
    return new ForbiddenStateEthics(forbiddenStateEthics);
  }

  getNormBasedEthics(normBasedEthics) {
    const norms = normBasedEthics.norms;
    const violationFunction = (state) => {
      if (state in normBasedEthics.violationFunction) {
        return normBasedEthics.violationFunction[state];
      }
      return [];
    };
    const penaltyFunction = (norm, state, action) => {
      return normBasedEthics.penaltyFunction[norm];
    };
    const tolerance = normBasedEthics.tolerance;

    return new NormBasedEthics(norms, violationFunction, penaltyFunction, tolerance);
  }

  getEthics(ethics, forbiddenStateEthics, normBasedEthics) {
    if (this.props.settings.ethics === 'forbiddenStateEthics') {
      return this.getForbiddenStateEthics(forbiddenStateEthics);
    }

    if (this.props.settings.ethics === 'normBasedEthics') {
      return this.getNormBasedEthics(normBasedEthics);
    }
  }

  render() {
    const agent = this.getAgent(this.props.gridWorld);
    const ethics = this.getEthics(this.props.ethics, this.props.forbiddenStateEthics, this.props.normBasedEthics);

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
              amoralAction={amoralSolution.policy[id]}
              moralAction={moralSolution.policy[id]}
              amoralValue ={amoralSolution.values[id]}
              moralValue ={moralSolution.values[id]}
              updateGridWorld={this.props.updateGridWorld}
              toggleForbiddenState={this.props.toggleForbiddenState}
              toggleNorm={this.props.toggleNorm}
            />
          </Col>
        );
      });
      return <Row key={rowId}>{row}</Row>;
    });

    return (
      <Container>
        <ControlPanel
          settings={this.props.settings}
          forbiddenStateEthics={this.props.forbiddenStateEthics}
          normBasedEthics={this.props.normBasedEthics}
          amoralValues ={amoralSolution.values}
          moralValues ={moralSolution.values}
          updateEthics={this.props.updateEthics}
          updateView={this.props.updateView}
          clearGridWorld={this.props.clearGridWorld}
          clearForbiddenStates={this.props.clearForbiddenStates}
          clearNorms={this.props.clearNorms}
          updateTolerance={this.props.updateTolerance}
        />
        <Container id="grid-world">{gridWorld}</Container>
      </Container>
    );
  }
}

Playground.propTypes = {
  settings: PropTypes.object.isRequired,
  gridWorld: PropTypes.object.isRequired,
  forbiddenStateEthics: PropTypes.arrayOf(PropTypes.number).isRequired,
  normBasedEthics: PropTypes.object.isRequired,
  updateEthics: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  clearGridWorld: PropTypes.func.isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  clearForbiddenStates: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired,
  clearNorms: PropTypes.func.isRequired,
  toggleNorm: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired
};
