import React from "react";
import HomeContainer from "../../containers/home";
import { fetchMovieApi } from "../../services/movie";

const getSingleCategory = async (genreId) => {
  return fetchMovieApi("/discover/movie", `with_genres=${genreId}`);
};

const getCategories = async () => {
  return fetchMovieApi("/genre/movie/list", `&page=1`);
};

const getPopularMovies = async () => {
  return fetchMovieApi("/movie/popular", `&page=1`);
};

const getTopRatedMovies = async () => {
  return fetchMovieApi("/movie/top_rated", `&page=1`);
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
