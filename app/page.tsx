import Link from "next/link";
import { getMovies } from "./api/route";
import styles from "./page.module.css";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};


const MovieCard = (movie:Movie) => {
  return (
    <Link href={`/movie/${movie.imdbID}`} className={styles["movie-card"]}>
   <>
    <div className={styles['movie-image']}>
    {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className={styles["no-image"]}>No Image</div>
      )}
    </div>
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
   </>
    </Link>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {

  if (!searchParams?.searchQuery) {
    return <h1>Search for a movie!</h1>;
  }

  const movies = await getMovies(searchParams.searchQuery, searchParams.year)
  console.log(movies)
  if(!movies.Search) {
    return <h1>No movies found</h1>
  }

  return (
    <div className={styles['grid-container']}>
      {movies.Search.map((movie: Movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
  )
}
