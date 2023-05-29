const API_URL = "https://api.themoviedb.org/3";

const fetchMovieApi = async (pathname, query = "") => {
  const rest = await fetch(
    `${API_URL}${pathname}?api_key=${process.env.API_KEY}&${query}`
  );
  return rest.json();
};

export { fetchMovieApi };
