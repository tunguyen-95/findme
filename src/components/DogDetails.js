import React from 'react';
import { Link } from 'react-router-dom';
import './DogDetails.css';

export default function DogBreedImages(props) {
  const { images, breed } = props;

  return (
    <div>
      <h2>Images of the {breed}</h2>

      <Link to="/">Go back to the index</Link>

      <div>
        {images &&
          images.map(url => (
            <img className="dog-breed-images" src={url} alt="Dog" />
          ))}
        {!images && 'Loading...'}
      </div>
    </div>
  );
}
