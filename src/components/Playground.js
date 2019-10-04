import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as morality from 'morality';
import * as GridWorldAgent from 'morality/src/agents/grid-world-agent.js';
import * as ForbiddenStateEthics from 'morality/src/ethics/forbidden-state-ethics.js';
import Square from './Square';

export default class GridWorld extends React.Component {
  render() {
    const gridWorldMdp = new GridWorldAgent(this.props.gridWorld);
    const ethics = new ForbiddenStateEthics(this.props.forbiddenStates);

    const amoralPolicy = morality.solve(gridWorldMdp);
    const moralPolicy = morality.solve(gridWorldMdp, ethics);

    const grid = this.props.gridWorld.grid.map((squares, rowId) => {
      const row = squares.map((square, columnId) => {
        const id = this.props.gridWorld.width * rowId + columnId;
        return (
          <Col key={columnId} xs={1}>
            <Square
              id={id}
              rowId={rowId}
              columnId={columnId}
              type={square}
              amoralAction={amoralPolicy[id]}
              moralAction={moralPolicy[id]}
              isForbidden={this.props.forbiddenStates.includes(id)}
              updateGridWorld={this.props.updateGridWorld}
              toggleForbiddenState={this.props.toggleForbiddenState}
            />
          </Col>
        );
      });
      return <Row key={rowId}>{row}</Row>;
    });

    return <Container>{grid}</Container>;
  }
}

GridWorld.propTypes = {
  gridWorld: PropTypes.object.isRequired,
  forbiddenStates: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateGridWorld: PropTypes.func.isRequired,
  toggleForbiddenState: PropTypes.func.isRequired
};
