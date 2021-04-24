import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from "./axios";
import "./Row.css";
import movieTrailer from 'movie-trailer';


const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    // Options for react-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
        else {

            let trailerurl = await axios.get(
                `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
            );
            console.log(trailerurl.data.results[0]?.key)
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }

    };
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    return (
        <div className='row'>
            {/* title */}
            <h4>{title}</h4>

            <div className='row__posters'>
                {/* posters */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>

            {/* container ->posters */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

            {/*  */}

        </div >
    )
}

export default Row;
