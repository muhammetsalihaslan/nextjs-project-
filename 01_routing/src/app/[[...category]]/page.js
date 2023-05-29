import React from "react";
import HomeContainer from "../../containers/home";
import Movies from "../../mocks/movies.json";

const API_URL = "https://api.themoviedb.org/3";

const getSingleCategory = async (genreId) => {
  const rest = await fetch(
    `${API_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}`
  );
  return rest.json();
};

const getCategories = async () => {
  const rest = await fetch(
    `${API_URL}/genre/movie/list?api_key=${process.env.API_KEY}&page=1`
  );
  return rest.json();
};

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
  const categoryPromise = getCategories();

  const [
    { results: TopRatedMovies },
    { results: popularMovies },
    { genres: categories },
  ] = await Promise.all([topRatedPromise, popularPromise, categoryPromise]);

  // const { results: TopRatedMovies } = await getTopRatedMovies();
  // const { results: popularMovies } = await getPopularMovies();

  if (params.category?.length > 0) {
    const { results } = await getSingleCategory(params.category[0]);
    selectedCategory = results;
  }
  return (
    <HomeContainer
      TopRatedMovies={TopRatedMovies}
      popularMovies={popularMovies}
      categories={categories}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? selectedCategory.slice(0, 7) : [],
      }}
    />
  );
}

export default HomePage;
