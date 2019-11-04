import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';
import DisplayAnswers from './DisplayAnswers';
import SuccessRate from './SuccessRate';
import { gameUrl, addGameOneOptions, addAdditionBreeds } from '../actions';
import { breedsAlreadySeen } from '../actions/BreedOrder';
import { addDifficulty } from '../actions/addDifficulty';
import './GameContainer.css';

class GameContainer extends Component {
  state = { answerIncorrectly: false };

  componentDidMount() {
    this.didMount();
  }

  async didMount() {
    try {
      await this.props.addGameOneOptions();
      await this.renderRandomImage();
    } catch (error) {
      console.error(error);
    }
  }

  renderRandomImage = () => {
    const condition = this.props.userAnswers
      .slice(this.props.userAnswers.length - 5, this.props.userAnswers.length)
      .every(value => value === true);

    if (
      this.props.userAnswers.length >= 5 * this.props.difficulty &&
      condition === true
    ) {
      this.props.addDifficulty(1);
      this.props.addAdditionBreeds();
    }

    request
      .get(
        `https://dog.ceo/api/breed/${
          this.props.game.option[
            Math.floor(Math.random() * this.props.game.option.length)
          ]
        }/images/random`
      )
      .then(res => {
        this.props.gameUrl({
          url: res.body.message,
          correctAnswer: res.body.message.split('/')[4].split('-')[0]
        });
      })
      .catch(console.error);
  };

  handleSubmit = event => {
    event.preventDefault();

    this.renderRandomImage();
    if (this.props.game.correctAnswer != null) {
      this.props.breedsAlreadySeen(this.props.game.correctAnswer);
    }
  };

  showCorrectAnswer = () => {
    const buttons = document.getElementsByTagName('button');

    if (this.state.answerIncorrectly === true) {
      buttons[0].style.pointerEvents = 'none';
      buttons[1].style.pointerEvents = 'none';
      // buttons[2].style.pointerEvents = 'none';
      // buttons[3].style.pointerEvents = 'none';
      // buttons[4].style.pointerEvents = 'none';

      return <h1>{this.props.game.correctAnswer}</h1>;
    } else if (buttons.length > 2) {
      buttons[0].style.pointerEvents = 'auto';
      buttons[1].style.pointerEvents = 'auto';
      // buttons[2].style.pointerEvents = 'auto';
      // buttons[3].style.pointerEvents = 'auto';
      // buttons[4].style.pointerEvents = 'auto';
    }
  };

  answeredIncorrectly = () =>
    this.setState({
      answerIncorrectly: !this.state.answerIncorrectly
    });

  render() {
    return (
      <div className="game-one">
        <span>
          <img
            onClick={() => {
              this.props.addDifficulty(1);
              this.props.addAdditionBreeds();
            }}
            alt="level-up"
            className="button"
            src="../images/levelup.png"
          />

          <NavLink to="/">
            <img className="button" alt="Back" src="../images/back.png" />
          </NavLink>
        </span>

        <div className="game-one-container">
          <div className="success-container">
            <SuccessRate
              success={this.props.userAnswers}
              difficulty={this.props.difficulty}
            />
          </div>

          {this.showCorrectAnswer()}

          <br />

          {this.props.game.url === '' ? (
            <p>loading</p>
          ) : (
            <img
              alt="dog"
              className="dog-game-image"
              src={this.props.game.url}
            />
          )}
          <br />

          <DisplayAnswers
            answer={this.props.game.correctAnswer}
            renderRandomImage={this.renderRandomImage}
            incorrectState={this.answeredIncorrectly}
            handleSubmit={this.props.handleSubmit}
          />

          <br />

          <img
            className="button"
            onClick={this.handleSubmit}
            alt="Next"
            src="../images/next.png"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  breedsLearned: state.breedsAlreadySeen,
  game: state.game,
  difficulty: state.difficulty
});

export default connect(
  mapStateToProps,

  {
    gameUrl,
    breedsAlreadySeen,
    addDifficulty,
    addGameOneOptions,
    addAdditionBreeds
  }
)(GameContainer);
