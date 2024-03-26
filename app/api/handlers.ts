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

    console.log(query);

    const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&type=movie${query}`
    );


    if (!res.ok) {
        throw new Error("Failed to fetch movies");
    }

    return res.json();
};
