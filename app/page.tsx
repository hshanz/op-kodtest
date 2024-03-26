import Link from "next/link";
import { getMovies } from "./api/handlers";
import styles from "./page.module.css";
import SearchBar from "@/componets/SearchBar";

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

  if (!searchParams?.query) {
    return (
      <>
      <SearchBar />
      <div className={styles['empty-state']}>
        <h1>Search for a movie above!</h1>
      </div>
      </>
    );
  }

  const movies = await getMovies(searchParams.query, searchParams.year)
  console.log(movies)
  if(!movies.Search) {
    return (
      <>
        <SearchBar />
        <div className={styles["empty-state"]}>
        <h1>No movies found :( </h1>
      </div>
      </>
    );
  }

  return (
    <>
    <SearchBar />
    <div className={styles['grid-container']}>
      {movies.Search.map((movie: Movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
    </>
  )
}
