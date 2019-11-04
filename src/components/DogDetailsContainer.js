import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import DogDetails from './DogDetails';
import { addBreedImages } from '../actions/addBreedImages';

class DogDetailsContainer extends Component {
  componentDidMount() {
    //fetching 10 images of the chosen breed
    const breed = this.props.match.params.breed;

    request
      .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`)
      .then(response => {
        this.props.addBreedImages(response.body.message.slice(0, 10));
      })
      .catch(console.error);
  }

  render() {
    return (
      <DogDetails
        images={this.props.imagesDetails}
        breed={this.props.match.params.breed}
      />
    );
  }
}

const mapStateToProps = state => ({
  imagesDetails: state.imagesDetails
});

export default connect(
  mapStateToProps,
  { addBreedImages }
)(DogDetailsContainer);
