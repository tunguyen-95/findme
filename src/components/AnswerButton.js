import React, { Component } from 'react';

export default class AnswerButton extends Component {
  render() {
    return (
      <button
        className="answer-button"
        onClick={this.props.handleClick}
        value={this.props.randomAnswers}
      >
        {this.props.randomAnswers}
      </button>
    );
  }
}
