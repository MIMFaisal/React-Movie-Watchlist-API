import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Harry Potter");
  const [favourites, setFavourites] = useState([]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-favourites", JSON.stringify(items));
  };

  const getMovies = async (search) => {
    const API_KEY = "f75e078"; //https://www.omdbapi.com/?i=tt0086190&apikey=f75e078
    const URL = `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`;

    const response = await fetch(URL);

    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovies(search);
  }, [search]);

  useEffect(() => {
    const moviesfav = JSON.parse(
      localStorage.getItem("react-movie-favourites")
    );
    setFavourites(moviesfav);
  }, []);

  const addFavouriteMovie = (movie) => {
    if (!favourites.includes(movie)) {
      const updatedFavouriteMovies = [...favourites, movie];
      setFavourites(updatedFavouriteMovies);
      saveToLocalStorage(updatedFavouriteMovies);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const updatedFavouriteMovies = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(updatedFavouriteMovies);
    saveToLocalStorage(updatedFavouriteMovies);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading title="Movies" />
        <SearchBox searchValue={search} setSearch={setSearch} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavourite={addFavouriteMovie}
          favouriteMovies={AddFavourite}
        />
      </div>
      {favourites.length !== 0 && (
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieHeading title="Favourites" />
        </div>
      )}
      {favourites.length !== 0 && (
        <div className="row">
          <MovieList
            movies={favourites}
            handleFavourite={removeFavouriteMovie}
            favouriteMovies={RemoveFavourite}
          />
        </div>
      )}
    </div>
  );
};

export default App;
