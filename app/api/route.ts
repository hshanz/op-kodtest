export const getMovieDetails = async (id: string) => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return res.json();

};

export const getMovies = async (queryTerm: string, yearOfRelease: string) => {
    
    let query = `&s=${queryTerm}`;

    if (!queryTerm) {
        throw new Error("Query term is required");
    }
    
    if (yearOfRelease) {
        query = `&s=${queryTerm}&y=${yearOfRelease}`;
    }

    // const res = await fetch(
    //     `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&type=movie${query}`
    // );


    // if (!res.ok) {
    //     throw new Error("Failed to fetch movies");
    // }

    return {
        Search: [
          {
            Title: 'The Batman',
            Year: '2022',
            imdbID: 'tt1877830',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg'
          },
          {
            Title: 'The Lego Batman and Spider-Man Movie',
            Year: '2022',
            imdbID: 'tt11579056',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BNTY0NTQ3OGEtODMzNi00N2I1LWJlOGYtYjQ2MDQzNzA5NjMxXkEyXkFqcGdeQXVyMTEyMTg5NTYz._V1_SX300.jpg'
          },
          {
            Title: 'The Oath: A Batman Fan Film',
            Year: '2022',
            imdbID: 'tt15460392',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYjNiOWQ0MmQtYmY1Ni00NzZkLWIxZjUtYTk2OTY4NDA2OTNlXkEyXkFqcGdeQXVyMTAzNjYzMjcy._V1_SX300.jpg'
          },
          {
            Title: 'Wonder Woman vs the Batman',
            Year: '2022',
            imdbID: 'tt18395286',
            Type: 'movie',
            Poster: 'N/A'
          },
          {
            Title: 'The Batman (2022)',
            Year: '2022',
            imdbID: 'tt18554796',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYWU0Y2Q0ZmUtMjhiZS00NDljLWIwOWMtZjJkNWQ1MjEyODcwXkEyXkFqcGdeQXVyNTMxMTQ1NTk@._V1_SX300.jpg'
          },
          {
            Title: 'The Batman (2022)',
            Year: '2022',
            imdbID: 'tt18601798',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BNWY2NjRiYWEtMjhkMS00NjhkLTk2NTQtOWYzMGU4M2ExMmUzXkEyXkFqcGdeQXVyMTE4NTEwNTky._V1_SX300.jpg'
          },
          {
            Title: 'Batman: Darkness of Day',
            Year: '2022',
            imdbID: 'tt19267476',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BMmE1MDliYmMtYWRhOC00MGI3LTkyMTItYWZlOGI4NWRiNjY5XkEyXkFqcGdeQXVyMTUwMTQyMDA2._V1_SX300.jpg'
          },
          {
            Title: 'The Batman (2022)',
            Year: '2022',
            imdbID: 'tt20149464',
            Type: 'movie',
            Poster: 'N/A'
          },
          {
            Title: 'The Batman (2022)',
            Year: '2022',
            imdbID: 'tt20871066',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYmYyZmZlZWUtZDIyMi00ZWM4LTk4NmUtNWNiY2JkYzU1MGY0XkEyXkFqcGdeQXVyMTIxMzgxMTE1._V1_SX300.jpg'
          },
          {
            Title: 'Batman: Heart of Ice',
            Year: '2022',
            imdbID: 'tt21825892',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BODc5YWU2MzUtZGFkNS00MWRiLTg2OTYtOThiZTJmNTQzNWEwXkEyXkFqcGdeQXVyMTAwOTU0ODgz._V1_SX300.jpg'
          }
        ],
        totalResults: '23',
        Response: 'True'
      }
      
};
