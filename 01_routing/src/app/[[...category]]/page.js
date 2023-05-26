import React from "react";
import HomeContainer from "../../containers/home";
import Movies from "../../mocks/movies.json";

const API_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async () => {
  const rest = await fetch(
    `${API_URL}/movie/popular?api_key=${process.env.API_KEY}&page=1`
  );
  return rest.json();
};

const getTopRatedMovies = async () => {
  const rest = await fetch(
    `${API_URL}/movie/top_rated?api_key=${process.env.API_KEY}&page=1`
  );
  return rest.json();
};

async function HomePage({ params }) {
  let selectedCategory;

  const topRatedPromise = getTopRatedMovies();
  const popularPromise = getPopularMovies();

  const [{ results: TopRatedMovies }, { results: popularMovies }] =
    await Promise.all([topRatedPromise, popularPromise]);

  // const { results: TopRatedMovies } = await getTopRatedMovies();
  // const { results: popularMovies } = await getPopularMovies();

  if (params.category?.length > 0) {
    selectedCategory = true;
  }
  return (
    <HomeContainer
      TopRatedMovies={TopRatedMovies}
      popularMovies={popularMovies}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? Movies.results.slice(0, 7) : [],
      }}
    />
  );
}

export default HomePage;
