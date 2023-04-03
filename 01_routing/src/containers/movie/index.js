import { FeaturedMovie } from "@/src/components/featured-movie";
import React from "react";

function MovieContainer({ movie }) {
  return <FeaturedMovie movie={movie} isCompact={false} />;
}

export { MovieContainer };
