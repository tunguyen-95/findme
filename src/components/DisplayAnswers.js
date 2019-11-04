import React from 'react';
import { connect } from 'react-redux';

import { addUserAnswer } from '../actions/userAnswers';
import AnswerButton from './AnswerButton';
import { breedsAlreadySeen } from '../actions/BreedOrder';

import './DisplayAnswers.css';
import randomIndex from './randomIndex';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();

    const hint = document.getElementById('hint');
    hint.textContent = '';

    if (this.props.answer != null) {
      this.props.breedsAlreadySeen(this.props.answer);
    }

    const {
      addUserAnswer,
      renderRandomImage,
      incorrectState,
      answer,
      handleSubmit
    } = this.props;

    if (answer === event.target.value) {
      addUserAnswer(true);
      renderRandomImage();
      if (handleSubmit !== undefined) handleSubmit();
    } else {
      addUserAnswer(false);
      incorrectState();
      setTimeout(() => {
        renderRandomImage();
        incorrectState();
        if (handleSubmit !== undefined) handleSubmit();
      }, 2000);
    }
  };

  showHint = () => {
    const correctAnswer = this.props.answer;
    const hint = document.getElementById('hint');
    hint.textContent =
      'The correct breed has the letter: ' + correctAnswer.charAt(2) + '';
  };

  answersArray = () => {
    if (Array.isArray(this.props.gameOptions)) {
      const breeds = this.props.gameOptions.filter(
        breed => this.props.answer !== breed
      );

      let arrayOfDogs = [];

      while (2 > arrayOfDogs.length) {
        const index = randomIndex(breeds.length),
          dog = breeds[index];

        if (!arrayOfDogs.includes(dog)) arrayOfDogs.push(dog);
      }

      return [...arrayOfDogs, this.props.answer].sort(
        () => Math.random() - 0.5
      );
    } else return ['But wait there is more!!!'];
  };

  render() {
    const { answer, breedsLearned } = this.props;
    const isVisible = !breedsLearned.includes(answer);

    return (
      <div>
        <p id="hint" className="hint-paragraph">
          {' '}
        </p>
        <br />

        {this.answersArray().map((answer, i) => (
          <AnswerButton
            id={`${i}`}
            key={i}
            handleClick={this.handleClick}
            randomAnswers={answer}
          />
        ))}

        <br />

        {isVisible ? (
          <div>
            <img
              className="button"
              id="hintButton"
              onClick={this.showHint}
              alt="Hint"
              src="../images/hint.png"
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  gameOptions: state.game.option,
  breedsLearned: state.breedsAlreadySeen
});

export default connect(
  mapStateToProps,
  { addUserAnswer, breedsAlreadySeen }
)(DisplayAnswers);
