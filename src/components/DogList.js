import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBreedState } from '../actions';
import DogCard from './DogCard';
import './GameContainer.css';

class DogsList extends Component {
  render() {
    const { breeds } = this.props;

    return (
      <div className="dogs-list">
        {!Array.isArray(breeds) ? (
          'Loading...'
        ) : (
          <ul>
            {breeds.map((breed, i) => (
              <DogCard key={i} breed={breed} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { setBreedState }
)(DogsList);
