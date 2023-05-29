import React from "react";
import { MovieContainer } from "@/src/containers/movie";
import Movies from "../../../mocks/movies.json";
import { notFound } from "next/navigation";

const API_URL = "https://api.themoviedb.org/3";

const getMovie = async (movieId) => {
  const rest = await fetch(
    `${API_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return rest.json();
};

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);

  if (!movieDetail) {
    notFound();
  }

  if (searchParams.error === "true") {
    throw new Error("Error happened");
  }

  return <MovieContainer movie={movieDetail} />;
}

export default MoviePage;
