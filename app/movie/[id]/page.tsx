import { getMovieDetails } from "../../api/handlers";
import styles from "./details.page.module.css";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  imdbRating: string;
  Plot: string;
  Director: string;
  Runtime: string;
  Actors: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const details = (await getMovieDetails(params.id)) as Movie;

  return (
    <div className={styles["movie-details"]}>
      <div className={styles["primary-details"]}>
        <h1>{details.Title}</h1>
        <h4>
          {details.Year} | {details.imdbRating}/10 | {details.Runtime}
        </h4>
      </div>
      <hr />
      <div className={styles.content}>
        <div className={styles["poster-container"]}>
          {details.Poster !== "N/A" ? (
            <img
              className={styles["movie-image"]}
              src={details.Poster}
              alt={details.Title}
            />
          ) : (
            <div className={styles["no-poster"]}>No Image</div>
          )}
        </div>

        <div className={styles["secondary-details"]}>
          <h3>Genre: {details.Genre}</h3>
          <h3>Director: {details.Director}</h3>
          <h3>Actors: {details.Actors}</h3>
          <div>
            <h3>Plot</h3>
            <p>{details.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
