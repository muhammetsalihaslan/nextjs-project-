import React from "react";
import Movies from "../../mocks/movies.json";
import Genres from "../../mocks/genres.json";
import { FeaturedMovie } from "@/src/components/featured-movie";
import Categories from "@/src/components/categories";
import MoviesSection from "@/src/components/movies-section";

const HomeContainer = ({
  TopRatedMovies = [],
  popularMovies = [],
  selectedCategory,
}) => {
  return (
    <div>
      <FeaturedMovie movie={Movies.results[0]} />
      <Categories categories={Genres.genres.slice(0, 5)} />
      {selectedCategory.movies.length > 0 && (
        <MoviesSection
          title={
            Genres.genres.find((genre) => `${genre.id}` === selectedCategory.id)
              .name
          }
          movies={selectedCategory.movies}
        />
      )}
      <MoviesSection
        title="Popular Films"
        movies={TopRatedMovies.slice(1, 7)}
      />
      <MoviesSection title="Your Films" movies={popularMovies.slice(7, 13)} />
    </div>
  );
};

export default HomeContainer;
