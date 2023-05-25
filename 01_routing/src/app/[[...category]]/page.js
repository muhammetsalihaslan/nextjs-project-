import React from "react";
import HomeContainer from "../../containers/home";
import Movies from "../../mocks/movies.json";

const API_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async () => {
  const rest = await fetch("${API_URL}/movie/popular?language=en-US&page=1");
  return rest.json();
};

async function HomePage({ params }) {
  let selectedCategory;

  const { results: popularMovies } = await getPopularMovies();

  if (params.category?.length > 0) {
    selectedCategory = true;
  }
  return (
    <HomeContainer
      popularMovies={popularMovies}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? Movies.results.slice(0, 7) : [],
      }}
    />
  );
}

export default HomePage;
