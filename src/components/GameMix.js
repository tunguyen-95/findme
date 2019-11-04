import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import SecondGameContainer from './SecondGameContainer';

import './GameContainer.css';

class GameMix extends Component {
  state = { game: false };

  //changes the oder of the displayed games
  handleSubmit = () => this.setState({ game: Math.random() - 0.5 });

  render() {
    return (
      <div>
        {this.state.game ? (
          <GameContainer handleSubmit={this.handleSubmit} />
        ) : (
          <SecondGameContainer handleSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  game: state.game
});

export default connect(mapStateToProps)(GameMix);
