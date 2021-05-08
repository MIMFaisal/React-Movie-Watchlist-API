import React from "react";

const MovieList = (props) => {
  const FavouriteMovies = props.favouriteMovies;
  return (
    <>
      {props.movies.map((movie, index) => {
        return (
          <div className="image-container d-flex justify-content-start">
            {(movie.Type==="movie" || movie.Type==="series") && <img key={index} src={movie.Poster} alt={movie.Title} />}
            <div
              onClick={() => props.handleFavourite(movie)}
              className="d-flex justify-content overlay align-items-center"
            >
              <FavouriteMovies />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
